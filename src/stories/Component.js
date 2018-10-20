import React from 'react'

export default class Comp extends React.Component{
  state = this.props.defaultState || {}
  setCompState = state => {
    this.setState(state)
  }
  render(){
    return(
      this.props.children({
        state: this.state,
        setState: this.setCompState
      })
    )
  }
}
