import React, { Component } from 'react';
// import format from 'date-fns/format'
import styled from 'react-emotion'
import Header from './Header'
import Graphs from './Graphs'
import firebase, { database } from './api'
import Login from './Login'
import 'normalize.css'
import './App.css';

class App extends Component {
  state = {
    scans: [],
    stations: null,
    loggedIn: false,
    user: null
  }
  componentDidMount = () => {
    this.fetchStations()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true,
          user
        })
      } else {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    });
  }
  fetchStations = () => {
    database
      .collection("stations")
      .get()
      .then(querySnapshot => {
        let stations = []
        querySnapshot.forEach(ss => {stations.push(ss.data())})
        this.setState({stations})
      })
  }
  render() {
    return (
      <div className="App">
        {
          this.state.loggedIn ?
          <React.Fragment>
            <Header/>
            <Graphs loading={!this.state.stations} stations={this.state.stations} />
          </React.Fragment>
          :
          <LoginWrapper>
            <Login/>
          </LoginWrapper>
        }
      </div>
    )
  }
}

const LoginWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '100vw',
  width: '100%',
  minHeight: '100vh',

})

export default App;
