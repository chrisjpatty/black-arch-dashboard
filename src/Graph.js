import React, { useEffect, useState, useRef } from 'react'
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

// Utility function for calculating the average in/out of all scans.
const getAverageDuration = scans =>
  (scans.reduce(
    (total, scan) =>
      total + (scan.out !== undefined && scan.in !== undefined ? differenceInSeconds(scan.out.toDate(), scan.in.toDate()) : 0),
    0
  ) /
  scans.length /
  60).toFixed(2)

// Utility function for calculating the date component for Firebase queries
const getWhereDate = period => {
  switch (period) {
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

// Represents a single Graph component
const Graph = ({ station, measurement, period }) => {
  // Set initial state
  const [targets, setTargets] = useState(DEFAULT_TARGETS)
  const [numScans, setNumScans] = useState(0)
  const [avg_duration, setAvgDuration] = useState(0)

  // Initialize DOM ref for target input
  const targetInput = useRef(null)

  // Attach realtime listener
  useEffect(
    () => {
      const unsubscribe = database
        .collection('stations')
        .doc(`station_${station.id}`)
        .collection('scans')
        .where('out', '>', getWhereDate(period))
        .orderBy('out', 'desc')
        .onSnapshot(querySnapshot => {
          let scans = []
          querySnapshot.forEach(ss => {
            scans.push(ss.data())
          })
          const avg_duration = getAverageDuration(scans)
          // Update state
          setNumScans(scans.length)
          setAvgDuration(avg_duration)
        })
      return unsubscribe
    },
    [period, measurement]
  )

  // Convert scan vectors into DOM-consumable vectors.
  const getGraphVectors = () => {
    switch (measurement) {
      case 'avg_duration':
        return {
          total: targets[`${measurement}_${period}`] || 10,
          current: avg_duration
        }
      case 'count':
      default:
        return {
          total: targets[`${measurement}_${period}`] || 10,
          current: numScans
        }
    }
  }

  // Update the value of the current target
  const handleTargetChange = e => {
    const value =
      typeof e === 'object' ? e.target.value.replace(/\D/g, '') : e < 0 ? 0 : e
    setTargets({
      ...targets,
      [`${measurement}_${period}`]: value
    })
  }

  // Check for Up/Down keypresses and increment/decrement target
  const handleKeyPress = e => {
    if (e.keyCode === 38) {
      e.preventDefault()
      handleTargetChange(targets[`${measurement}_${period}`] + 1)
    }
    if (e.keyCode === 40) {
      e.preventDefault()
      handleTargetChange(targets[`${measurement}_${period}`] - 1)
    }
  }

  const selectTarget = () => targetInput.current.select()

  const { total, current } = getGraphVectors()

  return (
    <Wrapper>
      <Title className="graph-title">{station.name}</Title>
      <TargetInput
        innerRef={targetInput}
        onFocus={selectTarget}
        onChange={handleTargetChange}
        onKeyDown={handleKeyPress}
        type="text"
        className="graph-target"
        value={targets[`${measurement}_${period}`]}
      />
      <Speedometer total={total} current={current} />
      <CurrentWrapper>
        <Current>
          {current}
        </Current>
      </CurrentWrapper>
    </Wrapper>
  )
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

const CurrentWrapper = styled('div')({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  left: 0,
  bottom: '.5vw',
  width: '100%',
  zIndex: 5
})

const Current = styled('div')({
  background: 'rgb(45, 45, 45)',
  borderRadius: '2vw',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: 'sans-serif',
  padding: '.5vw 1vw',
  fontSize: '2.3vw',
  fontWeight: 600,
  minWidth: '3.5vw'
})

export default Graph
