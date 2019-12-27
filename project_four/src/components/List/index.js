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
import deleteIcon from './delete_icon.png';
import renameIcon from './rename_icon.png';

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
      <Card className="list-card border border-0 radius-0">
        <CardHeader className="list-header mb-0 border border-0">
          <h2 className="d-flex justify-content-between mb-0">
            {renaming
              ? <Input className="f-auto" name="newName" value={newName} onChange={this.handleChange}/>
              : <div>
                  <img
                    className="bg-light p-1"
                    width="35px"
                    src={addIcon}
                    alt="add"
                    onClick={this.handleAdd}
                  />
                  <Button className="list-name-btn" color="link" onClick={this.handleClick}>
                    {name}
                  </Button>
                </div>
            }
            <div className="ml-3 d-flex align-items-center">
              {renaming
                ? <Button className="radius-0 icon-btn" color="primary" onClick={this.handleSave}>
                    Save
                  </Button>
                : <Button className="icon-btn d-flex align-items-center" color="primary" onClick={this.toggleRename}>
                    <img className="rename-icon" src={renameIcon} alt="rename"/>
                  </Button>
              }
              <Button
                className="icon-btn delete-btn ml-3 d-flex align-items-center border border-0"
                onClick={this.handleDelete}
              >
                <img className="delete-icon" src={deleteIcon} alt="delete"/>
              </Button>
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
