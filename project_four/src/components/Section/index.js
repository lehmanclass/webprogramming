import React, { Component } from 'react';
import './Section.css';
import { getToken } from '../../helpers';
import { Button } from 'reactstrap';
import { list } from '../../api';
import List from '../List';

class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: getToken(),
      listName: '',
      lists: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const sectionId = this.props.section.id;

    list.getUserLists(sectionId)
      .then((payload) => {
        if ('msg' in payload) {
          return;
        }

        const lists = payload.lists;

        this.setState({ lists });
      });
  }

  handleDelete(listId) {
    list.remove(listId)
      .then(payload => {
        if ('msg' in payload) {
          return;
        }
        
        this.setState(({lists}) => ({
          lists: lists.filter(list => list.id !== listId)
        }));
      });
  }

  handleCreate() {
    const listName = 'New List';
    const id = this.props.section.id;

    list.create(listName, id)
      .then(payload => {
        if ('msg' in payload) {
          return;
        }

        const list = payload.list;
  
        this.setState(({lists}) => ({
          lists: [list, ...lists],
          creating: false,
          listName: ''
        }));
      });
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const lists = this.state.lists;
    const { name } = this.props.section;

    return (
      <div className="Section">
        <h2 className="section-name">{name} todo's</h2>
        <Button
          className="section-btn auth-btn border border-0 m-auto"
          block
          onClick={this.handleCreate}
          size="md"
        >CREATE</Button>
        <div className="section-lists">
          {lists.map(list => (
            <List
              key={list.id}
              list={list}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Section;