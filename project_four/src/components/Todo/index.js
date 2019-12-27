import React, { Component } from 'react';
import {CustomInput, Input } from 'reactstrap';
import './Todo.css';
import removeIcon from './remove_icon.png';
import { todo } from '../../api';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: props.todo.todo,
      newTodo: props.todo.todo,
      completed: props.todo.completed
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  handleBlur() {
    const newTodo = this.state.newTodo;
    const currTodo = this.state.todo;

    if (currTodo !== newTodo) {
      todo.rename(newTodo, this.props.todo.id)
        .then(payload => {
          if ('msg' in payload) {
            return;
          }

          this.setState({
            todo: newTodo,
            newTodo
          });
        });
    } else {
      this.setState({
        newTodo: currTodo
      });
    }
  }

  handleDelete() {
    const {onDelete, todo} = this.props;

    onDelete(todo.id);
  }

  handleToggle() {
    todo.toggle(this.props.todo.id)
      .then(payload => {
        if ('msg' in payload) {
          return;
        }

        this.setState(({completed}) => ({
          completed: !completed
        }));
      });
  }

  render() {
    const {completed, newTodo} = this.state;

    return (
      <div className="Todo d-flex p-2">
        <CustomInput
          id={this.props.todo.id}
          type="checkbox"
          checked={completed}
          onChange={this.handleToggle}
        />
        <Input
          className="todo-input border border-0 radius-0"
          name="newTodo"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={newTodo}
        />
        <div className="d-flex align-items-center">
          <img
            className="remove-icon ml-2"
            src={removeIcon}
            alt="remove"
            onClick={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default Todo;