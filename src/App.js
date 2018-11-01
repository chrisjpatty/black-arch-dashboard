import React, { useState, useEffect } from 'react';
import styled from 'react-emotion'
import Footer from './Footer'
import Graphs from './Graphs'
import firebase, { database } from './api'
import Login from './Login'
import 'normalize.css'
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [stations, setStations] = useState([])
  const [user, setUser] = useState(null)

  // Fetch all stations
  useEffect(() => {
    database
      .collection("stations")
      .get()
      .then(querySnapshot => {
        let stations = []
        querySnapshot.forEach(ss => {stations.push(ss.data())})
        setStations(stations)
      })
  }, [])

  // Attach auth event listener
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true)
        setUser(user)
      } else {
        setLoggedIn(false)
        setUser(null)
      }
    });
    return unsubscribe
  }, [])

  return (
    <div className="App">
      {
        loggedIn ?
        <React.Fragment>
          <Graphs loading={!stations} stations={stations} />
          <Footer />
        </React.Fragment>
        :
        <LoginWrapper>
          <Login/>
        </LoginWrapper>
      }
    </div>
  )
}

const LoginWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '100vw',
  width: '100%',
  minHeight: '100vh'
})

export default App;
