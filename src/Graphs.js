import React, { useState } from 'react'
import styled from 'react-emotion'
import Toolbar from './Toolbar'
import Graph from './Graph'

const Graphs = ({loading, stations}) => {
  const [period, setPeriod] = useState('day')
  const [measurement, setMeasurement] = useState('count')

  return loading ? (
    <span>Loading...</span>
  ) : (
    <Wrapper>
      <Toolbar
        period={period}
        measurement={measurement}
        onPeriodChange={setPeriod}
        onMeasurementChange={setMeasurement}
      />
      <Grids>
        {stations.map((station, i) => (
          <Graph
            station={station}
            period={period}
            measurement={measurement}
            key={i}
          />
        ))}
      </Grids>
    </Wrapper>
  )
}

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

export default Graphs
