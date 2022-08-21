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
    this.props.changeCheck(this.props.index)
  }

  handleItemEdit = () => {
    this.setState({edit: true})
    const newItem = this.editRef.current.value
    this.props.editItem(newItem, this.props.index)
  }

  handleItemDone = event => {
    if (event.key === 'Enter') {
        this.setState({edit: false})
    }
  }

  handleUp = () => {
    this.props.moveUp(this.props.index)
  }

  handleDown = () => {
    this.props.moveDown(this.props.index)
  }

  render() {
    const {edit} = this.state
    const {todo} = this.props;
    return (
      <div className="item">
        <input id="checkbox" type='checkbox' checked={todo.complete} onChange={this.handleItemClick}/>
        <p style={todo.complete ? {textDecoration: 'line-through'} : {}}>
          {!edit && todo.name} 
          {edit && 
            <input 
              ref={this.editRef} 
              type='text' 
              value={todo.name} 
              onChange={this.handleItemEdit}
              onKeyDown={this.handleItemDone}
            />
          }
        </p>
        <button id="edit" onClick={this.handleItemEdit}>Edit</button>
        <button onClick={this.handleUp}>Up</button>
        <button onClick={this.handleDown}>Down</button>
      </div>
    )
  }
}

export default Item