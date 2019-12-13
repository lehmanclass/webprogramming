import React, { Component } from 'react';
import '../css/PositiveBoard.css';
import { Input, Button } from 'antd';
import Post from './Post';
import post_bubbles from '../post_bubbles.png';
import axios from 'axios';
import Socket from 'socket.io-client';
import uuidV4 from 'uuid/v4';

class PositiveBoard extends Component {
  constructor(props) {
    super(props);
    this.socket = Socket('http://localhost:8000');

    this.state = {
      uuid: uuidV4(),
      message: '',
      posts: []
    };

    this.socket.on('new post', ({ post, id}) => {
      this.setState(({ posts, uuid}) => ({
        posts: posts.concat({
          ...post,
          recent: uuid === id
        })
      }), () => {
        this.fixBoardScrollHeight();
      });
    })

    this.board = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    axios.get('/api/post')
      .then(({ data }) => {
        this.setState({
          posts: data.posts
        });
      })
      .catch(() => {
        console.log('Failed to get posts');
      });
    this.fixBoardScrollHeight();
  }

  fixBoardScrollHeight() {
    setTimeout(() => {
      const board = this.board.current;
      board.scrollTop = board.scrollHeight;
    }, 100);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handlePost() {
    const { message, uuid } = this.state;

    if (message) {
      axios.post('/api/post', {message})
        .then(({data}) => {
          const post = data.post;
          this.socket.emit('new post', {
            post,
            id: uuid
          });

          this.setState({message: ''});
        });
    }
  }

  render() {
    const { message, posts } = this.state;

    return (
      <div className="PositiveBoard">
        <div className="post-board">
          <div className="board" id="board" ref={this.board}>
            <div className="board-container">
              {posts.map((post) => (
                <div key={post.id} className={`post-cell ${(post.recent && 'recent-post') || ''}`}>
                  <Post className="recent-post" post={post.message}/>
                  <img src={post_bubbles} alt="post bubbles" width="25px" />
                </div>
              ))}
            </div>
          </div>
          <div className="input-section d-flex">
            <Input
              className="r-br"
              name="message"
              placeholder="Post some thoughts"
              value={message}
              onChange={this.handleChange}
            />
            <Button onClick={this.handlePost}>POST</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PositiveBoard;