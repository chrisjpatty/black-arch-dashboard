import React from 'react'
import styled from 'react-emotion'
import TextInput from './components/TextInput'
import firebase from './api'
import logo from './logo.png'

export default class Login extends React.Component{
  state = {
    email: "",
    password: "",
    error: ""
  }
  submit = () => {
    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(err => {
      if(err.code === 'auth/invalid-email'){
        this.setState({
          error: "The email or password you provided was not correct."
        })
      }
      console.error(err)
    });
  }
  setEmail = email => {this.setState({email})}
  setPassword = password => {this.setState({password})}
  render(){
    return(
      <Wrapper>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <TextInput label="Email" value={this.state.email} onChange={this.setEmail}/>
        <TextInput label="Password" type="password" value={this.state.password} onChange={this.setPassword} />
        <SubmitButton onClick={this.submit} type="button">Submit</SubmitButton>
        {
          this.state.error &&
          <ErrorWrapper>
            {this.state.error}
          </ErrorWrapper>
        }
      </Wrapper>
    )
  }
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
    background: 'rgba(255,255,255,.8)',
  },
  '&:active': {
    background: 'rgba(255,255,255,.6)',
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
