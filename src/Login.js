import React, { useState } from 'react'
import styled from 'react-emotion'
import TextInput from './components/TextInput'
import firebase from './api'
import logo from './logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Submit login request to Firebase and handle response.
  const submit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        if (err.code === 'auth/invalid-email')
          setError('The email or password you provided was not correct.')
        console.error(err)
      })
  }

  // Check if the user has pressed [Enter]
  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      submit()
    }
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src={logo} />
      </LogoWrapper>
      <TextInput
        label="Email"
        value={email}
        onChange={setEmail}
        onKeyDown={handleKeyPress}
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        onKeyDown={handleKeyPress}
      />
      <SubmitButton onClick={submit} type="button">
        Submit
      </SubmitButton>
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '100%',
  maxWidth: 300,
  background: 'rgba(255, 255, 255, 0.10)',
  padding: '0px 30px 30px 30px',
  borderRadius: 9
})

const LogoWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 25,
  paddingBottom: 25
})

const Logo = styled('img')({
  maxWidth: 240
})

const SubmitButton = styled('button')({
  textTransform: 'uppercase',
  width: '100%',
  borderRadius: 4,
  background: 'rgba(255,255,255,.7)',
  padding: 8,
  fontSize: 14,
  fontWeight: 600,
  border: 'none',
  marginTop: 10,
  marginBottom: 3,
  '&:hover': {
    background: 'rgba(255,255,255,.8)'
  },
  '&:active': {
    background: 'rgba(255,255,255,.6)'
  }
})

const ErrorWrapper = styled('p')({
  background: 'rgb(177, 53, 53)',
  color: '#fff',
  marginBottom: 0,
  padding: 10,
  paddingTop: 6,
  borderRadius: 4
})

export default Login
