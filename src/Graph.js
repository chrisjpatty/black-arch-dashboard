import React from 'react'
import styled from 'react-emotion'
import { database } from './api'
import subYears from 'date-fns/sub_years'
import subMonths from 'date-fns/sub_months'
import subWeeks from 'date-fns/sub_weeks'
import subDays from 'date-fns/sub_days'
import subHours from 'date-fns/sub_hours'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import Speedometer from './components/Speedometer'
import { DEFAULT_TARGETS } from './Constants'

export default class Graph extends React.Component {
  state = {
    targets: DEFAULT_TARGETS,
    numScans: 0,
    avg_duration: 0
  }
  unsubscribe = null
  componentDidMount = () => {
    this.attachScansListener()
  }
  componentDidUpdate = prevProps => {
    if (prevProps.period !== this.props.period) {
      this.unsubscribe()
      this.attachScansListener()
    }
  }
  selectTarget = () => {
    this.targetInput.select()
  }
  setTarget = e => {
    const value = typeof e === 'object' ? e.target.value.replace(/\D/g, '') : e < 0 ? 0 : e
    this.setState(state => ({
      targets: {
        ...state.targets,
        [`${this.props.measurement}_${this.props.period}`]: value
      }
    }))
  }
  handleKeyPress = e => {
    if(e.keyCode === 38){
      e.preventDefault()
      this.setTarget(this.state.targets[`${this.props.measurement}_${this.props.period}`] + 1)
    }
    if(e.keyCode === 40){
      e.preventDefault()
      this.setTarget(this.state.targets[`${this.props.measurement}_${this.props.period}`] - 1)
    }
  }
  attachScansListener = () => {
    this.unsubscribe = database
      .collection('stations')
      .doc(`station_${this.props.station.id}`)
      .collection('scans')
      .where('out', '>', this.getWhereDate())
      .orderBy('out', 'desc')
      .onSnapshot(querySnapshot => {
        let scans = []
        querySnapshot.forEach(ss => {
          scans.push(ss.data())
        })
        const avg_duration = this.getAverageDuration(scans)
        this.setState({ numScans: scans.length, avg_duration })
      })
  }
  getAverageDuration = scans =>
    scans.reduce(
      (total, scan) =>
        total + differenceInSeconds(scan.out.toDate(), scan.in.toDate()),
      0
    ) /
    scans.length /
    60
  getWhereDate = () => {
    switch (this.props.period) {
      case 'hour':
        return subHours(new Date(), 1)
      case 'week':
        return subWeeks(new Date(), 1)
      case 'month':
        return subMonths(new Date(), 1)
      case 'year':
        return subYears(new Date(), 1)
      case 'day':
      default:
        return subDays(new Date(), 1)
    }
  }
  getGraphVectors = () => {
    switch (this.props.measurement) {
      case 'avg_duration':
        return {
          total:
            this.state.targets[
              `${this.props.measurement}_${this.props.period}`
            ] || 10,
          current: this.state.avg_duration
        }
      case 'count':
      default:
        return {
          total:
            this.state.targets[
              `${this.props.measurement}_${this.props.period}`
            ] || 10,
          current: this.state.numScans
        }
    }
  }
  render() {
    const { station } = this.props
    const graphVectors = this.getGraphVectors()
    return (
      <Wrapper>
        <Title className="graph-title">{station.name}</Title>
        <TargetInput
          innerRef={ref => {
            this.targetInput = ref
          }}
          onFocus={this.selectTarget}
          onChange={this.setTarget}
          onKeyDown={this.handleKeyPress}
          type="text"
          className="graph-target"
          value={
            this.state.targets[`${this.props.measurement}_${this.props.period}`]
          }
        />
        <Speedometer
          total={graphVectors.total}
          current={graphVectors.current}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled('div')({
  width: '30vw',
  height: '20vw',
  position: 'relative',
  // border: '3px solid rgba(255, 255, 255, 0.10)',
  background: 'rgba(255, 255, 255, 0.05)',
  transition: 'background 300ms',
  borderRadius: 15,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    '& .graph-title': {
      opacity: 1
    },
    '& .graph-target': {
      opacity: 1,
      background: 'rgba(255,255,255,.15)'
    }
  }
})

const Title = styled('h2')({
  position: 'absolute',
  left: '1vw',
  top: '-.5vw',
  fontSize: '1.8vw',
  opacity: 0.4,
  transition: 'opacity 300ms',
  padding: '.4vw 1vw',
  borderRadius: '.8vw',
  background: 'rgba(255,255,255,.15)'
})

const TargetInput = styled('input')({
  position: 'absolute',
  right: '1vw',
  top: '.9vw',
  fontSize: '2.5vw',
  background: 'rgba(255,255,255,.0)',
  border: 'none',
  borderRadius: '.8vw',
  width: '8vw',
  height: '2.8vw',
  color: 'rgb(255,255,255)',
  fontWeight: 'bold',
  textAlign: 'right',
  paddingRight: '.3vw',
  opacity: 0.4,
  transition: 'opacity 300ms, background 300ms',
  zIndex: 4,
  '&:focus': {
    outline: 'none',
    background: 'rgba(255,255,255,.25)'
  }
})
