import React, { Component } from 'react'
import './App.css';
import List from './components/List';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="header">Todo List</h1>
        <List/>
      </div>
    )
  }
}

export default App;
