import React from 'react'
import styled from 'react-emotion'
import firebase from './api'

export default class Header extends React.Component{
  logout = () => {
    firebase.auth().signOut()
  }
  render(){
    return(
      <Wrapper>
        <RightAlign>
          <Button onClick={this.logout}>Logout</Button>
        </RightAlign>
      </Wrapper>
    )
  }
}

const Wrapper = styled('header')({
  display: 'flex',
  flexDirection: 'row',
  padding: 20,
  paddingBottom: 0
})

const RightAlign = styled('div')({
  marginLeft: 'auto'
})

const Button = styled('button')({
  background: 'none',
  border: 'none',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 600
})
