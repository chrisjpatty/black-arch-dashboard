import React from 'react'
import styled from 'react-emotion'
import { Spring, config } from 'react-spring'

class Speedometer extends React.Component {
  getRotation = () => {
    const percent = this.getPercentage()
    return 180 * percent
  }
  getPercentage = () => {
    if (this.props.total >= this.props.current) {
      return this.props.current / this.props.total
    } else {
      return 1
    }
  }
  render() {
    return (
      <InnerWrapper>
        <Spring
          from={{ rotation: 0 }}
          to={{ rotation: this.getRotation() }}
          config={config.stiff}
        >
          {styles => (
            <CircleWrapper
              style={{
                transform: `rotate(${styles.rotation}deg)`
              }}
            >
              <CircleHalf top />
              <CircleHalf />
            </CircleWrapper>
          )}
        </Spring>
      </InnerWrapper>
    )
  }
}

const InnerWrapper = styled('div')({
  position: 'absolute',
  left: '2vw',
  bottom: '2vw',
  width: '26vw',
  height: '16vw',
  // background: 'blue',
  overflow: 'hidden',
  borderRadius: '.8vw'
})

const CircleWrapper = styled('div')({
  position: 'absolute',
  left: 0,
  bottom: '-13vw',
  width: '26vw',
  height: '26vw',
  // background: 'red',
  borderRadius: '100%',
  overflow: 'hidden'
  // transition: 'transform 500ms'
})

const CircleHalf = styled('div')(
  {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '50%'
  },
  ({ top }) => ({
    top: top ? 'auto' : 0,
    bottom: top ? 0 : 'auto',
    background: top ? 'rgb(20, 233, 73)' : 'rgba(255, 255, 255, 0.10)'
  })
)

export default Speedometer
