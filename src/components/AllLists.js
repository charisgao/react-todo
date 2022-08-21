import React, { Component } from 'react'
import List from './List'

class AllLists extends Component {
  constructor(props) {
    super(props)

    this.titleRef = React.createRef()
  
    this.state = {
       allLists: [],
       newList: false,
       selectedIndex: null
    }
  }

  addList = () => {
    const newList = {title: this.titleRef.current.value, todoList: []}
    this.setState(prev => ({allLists: [...prev.allLists, newList]}))
    this.titleRef.current.value = null
    this.setState({newList: false})
  }

  handleNewList = () => {
    this.setState({newList: true})
  }

  render() {
    const {allLists, newList, selectedIndex} = this.state
    const selectedItem = selectedIndex !== null ? allLists[selectedIndex] : null
    return (
      <div>
        <div>
            {allLists.map((list, i) => {
                return <button key={i} onClick={() => this.setState({selectedIndex: i})}>{list.title}</button>
            })}
        </div>
        <button onClick={this.handleNewList}>Create a New List</button>
        {newList && 
            <div>
                <input ref={this.titleRef} type='text'/>
                <button onClick={this.addList}>Submit</button>
            </div>
        }
        {selectedItem && 
            <List 
                index={selectedIndex}
                title={selectedItem.title} 
                todoList={selectedItem.todoList} 
                changeAllLists={arg => this.setState(arg)}
            />
        }
      </div>
    )
  }
}

export default AllLists