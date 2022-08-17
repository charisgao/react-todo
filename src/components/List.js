import React, { Component } from 'react'
import Item from './Item'
import { v4 as uuidv4 } from 'uuid';

class List extends Component {
    constructor(props) {
        super(props)
    
        this.inputRef = React.createRef()
      
        this.state = {
           todoList: []
        }
    }

    addItem = () => {
        const newItem = {id: uuidv4(), name: this.inputRef.current.value, complete: false}
        this.setState(prev => ({todoList: [...prev.todoList, newItem]}))
        this.inputRef.current.value = null
      }
    
    changeCheck = (id) => {
        const newTodoList = [...this.state.todoList]
        const itemToChange = newTodoList.find(todo => todo.id === id)
        itemToChange.complete = !itemToChange.complete
        this.setState({todoList: newTodoList})
    }

    clearComplete = () => {
        const newTodoList = this.state.todoList.filter(todo => !todo.complete)
        this.setState({todoList: newTodoList})
    }    
    
    editItem = (newItem, id) => {
        const newTodoList = [...this.state.todoList]
        const itemToChange = newTodoList.find(todo => todo.id === id)
        itemToChange.name = newItem
        this.setState({todoList: newTodoList})
    }

    render() {
        return (
        <div>
            {this.state.todoList.map(todo => {
                return <Item key={todo.id} todo={todo} changeCheck={this.changeCheck} editItem={this.editItem}/>
            })}

            <input ref={this.inputRef} type='text' />
            <button onClick={this.addItem}>Add item</button>
            <p>{this.state.todoList.filter(todo => !todo.complete).length} items left to do</p>
            <button onClick={this.clearComplete}>Clear completed items</button>
        </div>
        )
    }
}

export default List
