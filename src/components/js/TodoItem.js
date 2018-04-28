import React from 'react';
import PropTypes from 'prop-types';
// material ui
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { cyan800 } from 'material-ui/styles/colors';
import '../css/TodoItem.css';

const styles = {
  checkBox: {
    marginLeft: 0,
  },
  checkBoxIcon: {
    fill: cyan800,
  },
  deleteIcon: {
    width: 15,
    height: 15,
  },
  delete: {
    width: 20,
    height: 20,
    padding: 5,
  },
};

const TodoItem = (props) => {
  const {
    listId,
    item,
    handleCheckItem,
    handleDeleteItem,
  } = props;

  return (
    <div className="item">
      <div className="itemContent">
        <Checkbox
          className="itemCheck"
          label={item.content}
          onCheck={(evt) => { handleCheckItem(evt, listId, item.id); }}
          iconStyle={styles.checkBoxIcon}
          style={styles.checkBox}
        />
      </div>
      <div className="itemDelete">
        <IconButton
          onClick={(evt) => { handleDeleteItem(evt, listId, item.id); }}
          iconStyle={styles.deleteIcon}
          style={styles.delete}
        >
          <ContentClear />
        </IconButton>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  listId: PropTypes.number.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleCheckItem: PropTypes.func.isRequired,
};

export default TodoItem;
