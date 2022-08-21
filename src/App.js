import React, { Component } from 'react'
import './App.css';
import AllLists from './components/AllLists';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="header">Todo Lists</h1>
        <AllLists/>
      </div>
    )
  }
}

export default App;
