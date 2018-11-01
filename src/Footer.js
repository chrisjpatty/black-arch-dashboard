import React from 'react'
import styled from 'react-emotion'
import firebase from './api'

const Footer = () => {
  const logout = () => {
    firebase.auth().signOut()
  }

  return (
    <Wrapper>
      <RightAlign>
        <Button onClick={logout}>Logout</Button>
      </RightAlign>
    </Wrapper>
  )
}

const Wrapper = styled('footer')({
  display: 'flex',
  flexDirection: 'row',
  padding: 20,
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%'
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

export default Footer
