import React, { Component } from 'react'
import Item from './Item'

class List extends Component {
    constructor(props) {
        super(props)
    
        this.inputRef = React.createRef()
    }

    addItem = () => {
        const {index, todoList, changeAllLists} = this.props
        const newItem = {itemIndex: todoList.length, name: this.inputRef.current.value, complete: false}
        this.inputRef.current.value = null

        changeAllLists(prev => ({
            allLists: [
                ...prev.allLists.slice(0, index),
                {...prev.allLists[index], todoList: [...prev.allLists[index].todoList, newItem]},
                ...prev.allLists.slice(index + 1)
            ]
        }))
    }
    
    changeCheck = itemIndex => {
        const {index, todoList, changeAllLists} = this.props
        changeAllLists(prev => ({
            allLists: [
                ...prev.allLists.slice(0, index),
                {...prev.allLists[index], todoList: [
                    ...prev.allLists[index].todoList.slice(0, itemIndex),
                    {...prev.allLists[index].todoList[itemIndex], complete: !todoList[itemIndex].complete},
                    ...prev.allLists[index].todoList.slice(itemIndex + 1),
                ]},
                ...prev.allLists.slice(index + 1)
            ]
        }))
    }

    clearComplete = () => {
        const {index, changeAllLists} = this.props
        changeAllLists(prev => ({
            allLists: [
                ...prev.allLists.slice(0, index),
                {...prev.allLists[index], todoList: [...prev.allLists[index].todoList.filter(todo => !todo.complete)]},
                ...prev.allLists.slice(index + 1)
            ]
        }))
    }    
    
    editItem = (newName, itemIndex) => {
        const {index, changeAllLists} = this.props
        changeAllLists(prev => ({
            allLists: [
                ...prev.allLists.slice(0, index),
                {...prev.allLists[index], todoList: [
                    ...prev.allLists[index].todoList.slice(0, itemIndex),
                    {...prev.allLists[index].todoList[itemIndex], name: newName},
                    ...prev.allLists[index].todoList.slice(itemIndex + 1),
                ]},
                ...prev.allLists.slice(index + 1)
            ]
        }))
    }

    moveUp = itemIndex => {
        const {index, changeAllLists} = this.props

        const getNewState = prev => {
            const allLists = prev.allLists
            const list = [...allLists[index].todoList]
            const temp = list[itemIndex]
            list[itemIndex] = list[itemIndex - 1]
            list[itemIndex - 1] = temp
            const thisList = {...allLists[index], todoList: list}
            const ret = [...allLists.slice(0, index), thisList, ...allLists.slice(index + 1)]
            return ret
        }
        if (itemIndex !== 0) {
            changeAllLists(prev => ({
                allLists: getNewState(prev)
            }))
        }
        
        // todoList: [...prev.todoList.slice(0, i-1), itemToMove, ...prev.todoList.slice(i-1, i), ...prev.todoList.slice(i+1)]
    }

    moveDown = itemIndex => {
        const {index, todoList, changeAllLists} = this.props
        if (index !== todoList.length - 1) {
            changeAllLists(prev => ({
                allLists: [
                    ...prev.allLists.slice(0, index),
                    {...prev.allLists[index], todoList: [
                        ...prev.allLists[index].todoList.slice(0, itemIndex),
                        ...prev.allLists[index].todoList.slice(itemIndex + 1, itemIndex + 2),
                        ...prev.allLists[index].todoList.slice(itemIndex, itemIndex + 1),
                        ...prev.allLists[index].todoList.slice(itemIndex + 2),
                    ]},
                    ...prev.allLists.slice(index + 1)
                ]
            }))
        }
    }

    render() {
        const{title, todoList} = this.props
        return (
        <div>
            <h3>{title}</h3>
            {todoList.map((todo, i) => {
                return <Item key={i} index={i} todo={todo} changeCheck={this.changeCheck} editItem={this.editItem} moveUp={this.moveUp} moveDown={this.moveDown}/>
            })}
            <input ref={this.inputRef} type='text' />
            <button onClick={this.addItem}>Add item</button>
            <p>{todoList.filter(todo => !todo.complete).length} items left to do</p>
            <button onClick={this.clearComplete}>Clear completed items</button>
        </div>
        )
    }
}

export default List
