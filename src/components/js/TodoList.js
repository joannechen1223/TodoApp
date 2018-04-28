import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { cyan800, cyan900 } from 'material-ui/styles/colors';

import TodoItem from './TodoItem';
import '../css/TodoList.css';

const styles = {
  deleteIcon: {
    color: cyan800,
  },
  listNameUnderline: {
    borderColor: cyan900,
  },
};

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      newTodoItem: { id: '', content: '' },
      itemIndex: 0,
      listName: { mode: 'display', content: '' },
    };
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.handleListNameDoubleClick = this.handleListNameDoubleClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      listName: { mode: 'display', content: this.props.list.listName },
    });
  }

  handleTodoChange(e) {
    this.setState({
      newTodoItem: { id: this.state.itemIndex, content: e.target.value },
    });
  }

  handleAddTodoItem(evt, index) {
    if (this.state.newTodoItem.content !== '') {
      this.props.parentHandleAddTodoItem(index, this.state.newTodoItem);
      this.setState({
        newTodoItem: { content: '' },
        itemIndex: this.state.itemIndex + 1,
      });
    }
  }

  handlePressEnter(e, listId, type) {
    if (e.key === 'Enter' && type === 'item') {
      this.handleAddTodoItem(e, listId);
    } else if (e.key === 'Enter' && type === 'list' && this.state.listName.content !== '') {
      this.props.handleEditTodoListName(e, listId, this.state.listName.content);
      this.setState({
        listName: { mode: 'display', content: e.target.value },
      });
    }
  }

  handleListNameDoubleClick() {
    this.setState({
      listName: { mode: 'edit', content: this.props.list.listName },
    });
  }

  handleChangeTodoListName(e) {
    this.setState({
      listName: { content: e.target.value },
    });
  }

  render() {
    const { items: displayItem, listId, listName } = this.props.list;
    // const { listId } = this.props.list;
    // const listName = this.props.list.listName;
    let displayTitle;
    if (this.state.listName.mode === 'display') {
      displayTitle = (
        <p
          className="listNameDisplay"
          onDoubleClick={this.handleListNameDoubleClick}
        >
          {listName}
        </p>
      );
    } else {
      displayTitle = (
        <TextField
          hintText="Your List Name"
          type="text"
          onChange={(evt) => { this.handleChangeTodoListName(evt); }}
          onKeyPress={(evt) => { this.handlePressEnter(evt, listId, 'list'); }}
          style={{ width: 280 }}
          underlineStyle={styles.listNameUnderline}
          underlineFocusStyle={styles.listNameUnderline}
          defaultValue={listName}
        />
      );
    }
    return (
      <div className="todoList">
        <div className="listName">
          {displayTitle}
        </div>
        <div className="itemInput">
          <TextField
            hintText="Add your todo item"
            type="text"
            value={this.state.newTodoItem.content}
            onChange={this.handleTodoChange}
            onKeyPress={(evt) => { this.handlePressEnter(evt, listId, 'item'); }}
            underlineFocusStyle={{ borderColor: cyan800 }}
          />
        </div>
        <div className="listDelete">
          <IconButton
            onClick={(evt) => { this.props.handleDeleteList(evt, listId); }}
            iconStyle={styles.deleteIcon}
          >
            <ActionDelete />
          </IconButton>
        </div>

        <ul className="displayItem">
          {displayItem.map(item => (
            <div className="list" key={item.id}>
              <TodoItem
                listId={listId}
                item={item}
                handleDeleteItem={this.props.handleDeleteItem}
                handleCheckItem={this.props.handleCheckItem}
              />
            </div>))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  list: PropTypes.shape({
    listId: PropTypes.number.isRequired,
    listName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
  parentHandleAddTodoItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleCheckItem: PropTypes.func.isRequired,
  handleEditTodoListName: PropTypes.func.isRequired,
  handleDeleteList: PropTypes.func.isRequired,
};

export default TodoList;
