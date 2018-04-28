import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import '../css/TodoApp.css';
import TodoList from './TodoList';

const style = {
  width: 500,
};

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todoLists: [],
      newTodoList: { id: '', content: '' },
      index: 0,
      undo: 0,
      complete: 0,
    };

    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleAddTodoList = this.handleAddTodoList.bind(this);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleEditTodoListName = this.handleEditTodoListName.bind(this);
  }

  handleTodoChange(evt) {
    if (evt.key === 'Enter') {
      this.handleAddTodoList();
      this.setState({
        newTodoList: { content: '' },
      });
    } else {
      this.setState({
        newTodoList: { id: this.state.index, content: evt.target.value },
      });
    }
  }

  handleAddTodoList() {
    const lists = this.state.todoLists;
    lists.push({
      listName: this.state.newTodoList.content,
      listId: this.state.newTodoList.id,
      items: [],
    });
    this.setState({
      todoLists: lists,
      newTodoList: { id: '', content: '' },
      index: this.state.index + 1,
    });
  }

  handleAddTodoItem(listId, newItem) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        const list = this.state.todoLists[i];
        list.items.push({
          id: newItem.id,
          content: newItem.content,
          complete: false,
        });
        const newTodoLists = this.state.todoLists;
        newTodoLists[i] = list;
        this.setState({
          todoLists: newTodoLists,
          undo: this.state.undo + 1,
        });
      }
    }
  }

  handleDeleteItem(e, listId, itemId) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        for (let j = 0; j < this.state.todoLists[i].items.length; j += 1) {
          if (this.state.todoLists[i].items[j].id === itemId) {
            const newItems = this.state.todoLists[i].items;
            const newTodoLists = this.state.todoLists;
            if (this.state.todoLists[i].items[j].complete === true) {
              this.setState({
                complete: this.state.complete - 1,
              });
            } else {
              this.setState({
                undo: this.state.undo - 1,
              });
            }
            newItems.splice(j, 1);
            newTodoLists[i].items = newItems;
            this.setState({
              todoLists: newTodoLists,
            });
          }
        }
      }
    }
  }

  handleDeleteList(e, listId) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        const newTodoLists = this.state.todoLists;
        let countUndo = 0;
        let countComplete = 0;
        for (let j = 0; j < this.state.todoLists[i].items.length; j += 1) {
          if (this.state.todoLists[i].items[j].complete === true) {
            countComplete += 1;
          } else {
            countUndo += 1;
          }
        }
        newTodoLists.splice(i, 1);
        this.setState({
          todoLists: newTodoLists,
          undo: this.state.undo - countUndo,
          complete: this.state.complete - countComplete,
        });
      }
    }
  }

  handleCheckItem(e, listId, itemId) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        for (let j = 0; j < this.state.todoLists[i].items.length; j += 1) {
          if (this.state.todoLists[i].items[j].id === itemId) {
            const item = this.state.todoLists[i].items[j];
            const newItems = this.state.todoLists[i].items;
            const newTodoLists = this.state.todoLists;
            if (item.complete === true) {
              item.complete = false;
              this.setState({
                undo: this.state.undo + 1,
                complete: this.state.complete - 1,
              });
            } else {
              item.complete = true;
              this.setState({
                undo: this.state.undo - 1,
                complete: this.state.complete + 1,
              });
            }
            newItems[j] = item;
            newTodoLists[i].items = newItems;
            this.setState({
              todoLists: newTodoLists,
            });
          }
        }
      }
    }
  }

  handleEditTodoListName(e, listId, listName) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        const newTodoList = this.state.todoLists;
        newTodoList[i].listName = listName;
        this.setState({
          todoLists: newTodoList,
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="todoAppHeader">
          <h1>Todo App</h1>
        </div>
        <div className="listInput">
          <TextField
            type="text"
            hintText="Enter your todo list name"
            onChange={this.handleTodoChange}
            onKeyPress={this.handleTodoChange}
            value={this.state.newTodoList.content}
            style={style}
          />
        </div>
        <div className="countDisplay">
          <p>
            {`Undo: ${this.state.undo}`}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {`Completed: ${this.state.complete}`}
          </p>
        </div>
        <div className="listBoard">
          <ul>
            {this.state.todoLists.map(list => (
              <div className="displayList" key={list.listId}>
                <TodoList
                  list={list}
                  parentHandleAddTodoItem={this.handleAddTodoItem}
                  handleDeleteItem={this.handleDeleteItem}
                  handleCheckItem={this.handleCheckItem}
                  handleEditTodoListName={this.handleEditTodoListName}
                  handleDeleteList={this.handleDeleteList}
                />
              </div>))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoApp;
