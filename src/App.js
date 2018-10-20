import React, { Component } from 'react';
// import format from 'date-fns/format'
import Header from './Header'
import Graphs from './Graphs'
import { database } from './api'
import 'normalize.css'
import './App.css';

class App extends Component {
  state = {
    scans: [],
    stations: null
  }
  componentDidMount = () => {
    this.fetchStations()
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
        <Header />
        <Graphs loading={!this.state.stations} stations={this.state.stations} />
      </div>
    )
  }
}

export default App;
