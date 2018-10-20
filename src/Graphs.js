import React from 'react'
import styled from 'react-emotion'
import Toolbar from './Toolbar'
import Graph from './Graph'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})

const Grids = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  paddingTop: '5vw'
})

export default class Graphs extends React.Component {
  state = {
    period: 'day',
    measurement: 'count'
  }
  setPeriod = period => {
    this.setState({ period })
  }
  setMeasurement = measurement => {
    this.setState({ measurement })
  }
  render() {
    const { loading, stations } = this.props
    return loading ? (
      <span>Loading...</span>
    ) : (
      <Wrapper>
        <Toolbar
          period={this.state.period}
          measurement={this.state.measurement}
          onPeriodChange={this.setPeriod}
          onMeasurementChange={this.setMeasurement}
        />
        <Grids>
          {stations.map((station, i) => (
            <Graph
              station={station}
              period={this.state.period}
              measurement={this.state.measurement}
              key={i}
            />
          ))}
        </Grids>
      </Wrapper>
    )
  }
}
