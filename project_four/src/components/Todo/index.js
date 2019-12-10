import React, { Component } from 'react';
import {CustomInput, Input, Button} from 'reactstrap';
import './Todo.css';
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
          name="newTodo"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={newTodo}
        />
        <Button
          className="ml-2"
          color="danger"
          onClick={this.handleDelete}
        >Delete</Button>
      </div>
    );
  }
}

export default Todo;