import React, { Component } from 'react'

class Item extends Component {

  constructor(props) {
    super(props)

    this.editRef = React.createRef();
  
    this.state = {
       edit: false
    }
  }

  handleItemClick = () => {
    const todoItem = this.props.todo
    this.props.changeCheck(todoItem.id)
  }

  handleItemEdit = () => {
    const todoItem = this.props.todo
    this.setState({edit: true})
    const newItem = this.editRef.current.value
    this.props.editItem(newItem, todoItem.id)
  }

  handleItemDone = event => {
    if (event.key === 'Enter') {
        this.setState({edit: false})
    }
  }

  render() {
    const todoItem = this.props.todo;
    let task = todoItem.name;
    let editField = null;
    if (this.state.edit) {
        task = null
        editField = <input ref={this.editRef} type='text' value={todoItem.name} onChange={this.handleItemEdit}  onKeyDown={this.handleItemDone}/>
    }
    return (
      <div className="item">
        <input id="checkbox" type='checkbox' checked={todoItem.complete} onChange={this.handleItemClick}/>
        {task}
        {editField}
        <button id="edit" onClick={this.handleItemEdit}>Edit</button>
      </div>
    )
  }
}

export default Item