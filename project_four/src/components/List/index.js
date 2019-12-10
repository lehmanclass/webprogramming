import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  Button,
  Input,
  Collapse
} from 'reactstrap';
import Todo from '../Todo';
import './List.css';
import { list, todo } from '../../api';
import addIcon from './add_icon.png';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      renaming: false,
      name: props.list.name,
      newName: props.list.name,
      todos: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleRename = this.toggleRename.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  componentDidMount() {
    todo.getTodoList(this.props.list.id)
      .then(payload => {
        if ('msg' in payload) {
          return;
        }

        const todos = payload.todos
        this.setState({todos});
      });
  }

  handleClick() {
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));
  }

  handleDelete() {
    const {onDelete, list} = this.props;

    onDelete(list.id);
  }

  toggleRename() {
    this.setState(({renaming}) => ({
      renaming: !renaming,
      newName: this.state.name
    }));
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSave() {
    const {name, newName} = this.state;
    const listId = this.props.list.id;

    if (name !== newName) {
      list.rename(newName, listId)
        .then(payload => {
          if ('msg' in payload) {
            return;
          }

          this.setState(({newName}) => ({
            name: newName,
            renaming: false
          }));
        });
    } else {
      this.setState({
        renaming: false
      });
    }
  }

  handleAdd() {
    todo.create('', this.props.list.id)
      .then(payload => {
        if ('msg' in payload) {
          return;
        }

        const todo = payload.todo;

        this.setState(({todos}) => ({
          todos: [todo, ...todos],
          isOpen: true
        }));
      });
  }

  handleDeleteTodo(todoId) {
    todo.remove(todoId)
      .then(payload => {
        if ('msg' in payload) {
          return;
        }

        this.setState(({todos}) => ({
          todos: todos.filter(todo => todo.id !== todoId)
        }));
      });
  }

  render() {
    const {
      isOpen,
      name,
      newName,
      renaming,
      todos
    } = this.state;

    return (
      <Card>
        <CardHeader>
          <h2 className="d-flex justify-content-between mb-0">
            {renaming
              ? <Input className="f-auto" name="newName" value={newName} onChange={this.handleChange}/>
              : <div>
                  <img
                    className="border border-secondary p-1"
                    width="35px"
                    src={addIcon}
                    alt="add"
                    onClick={this.handleAdd}
                  />
                  <Button color="link" onClick={this.handleClick}>
                    {name}
                  </Button>
                </div>
            }
            <div className="ml-3 d-flex">
              <Button color="danger" onClick={this.handleDelete}>
                Delete
              </Button>
              {renaming
                ? <Button className="ml-3" color="primary" onClick={this.handleSave}>
                    Save
                  </Button>
                : <Button className="ml-3" color="primary" onClick={this.toggleRename}>
                    Rename
                  </Button>
              }
            </div>
          </h2>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={this.handleDeleteTodo}
            />
          ))}
        </Collapse>
      </Card>
    );
  }
}

export default List;
