import React, { Component } from 'react';
import './ProfilePage.css';
import {
  Redirect
} from 'react-router-dom';
import {
  Button,
  Input
} from 'reactstrap';
import { getToken } from '../../helpers';
import CustomNavbar from '../../components/CustomNavbar';
import List from '../../components/List';
import { list } from '../../api';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: getToken(),
      creating: false,
      listName: '',
      lists: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    list.getUserLists()
      .then(payload => {
        if ('msg' in payload) {
          return;
        }

        const lists = payload.lists
        
        this.setState({lists});
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

  toggleCreate() {
    this.setState(({creating}) => ({
      creating: !creating,
      listName: ''
    }));
  }

  handleCreate() {
    const listName = this.state.listName;

    if (listName) {
      list.create(listName)
        .then(payload => {
          const list = payload.list;
    
          this.setState(({lists}) => ({
            lists: [list, ...lists],
            creating: false,
            listName: ''
          }));
        });
    }
  }

  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      token,
      lists,
      creating,
      listName
    } = this.state;
    
    // if (!token) {
    //   return <Redirect to="/"/>
    // }

    return (
      <div className="ProfilePage">
        <CustomNavbar />
        <div className="p-2">
          {creating
            ? <div className="d-flex justify-content-between">
                <Input name='listName' onChange={this.handleChange} value={listName}/>
                <div className="d-flex ml-3">
                  <Button onClick={this.handleCreate}>Create</Button>
                  <Button className="ml-2" onClick={this.toggleCreate}>Cancel</Button>
                </div>
              </div>
            : <Button block onClick={this.toggleCreate}>Create List</Button>
          }
        </div>
        {lists.map(list => (
          <List
            key={list.id}
            list={list}
            onDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default ProfilePage;
