import React from 'react'
import styled from 'react-emotion'
import ButtonRadio from './components/ButtonRadio'
import { PERIODS, MEASUREMENTS } from './Constants'

const Toolbar = ({
  period,
  measurement,
  onPeriodChange,
  onMeasurementChange
}) => {
  return (
    <Wrapper>
      <ButtonRadio
        buttons={PERIODS}
        onChange={period => {
          onPeriodChange(period)
        }}
        value={period}
      />
      <RightAlign>
        <ButtonRadio
          buttons={MEASUREMENTS}
          onChange={measurement => {
            onMeasurementChange(measurement)
          }}
          value={measurement}
        />
      </RightAlign>
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: '3vw'
})

const RightAlign = styled('div')({
  display: 'flex',
  marginLeft: 'auto'
})

export default Toolbar
