import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      books: [],
      wantToRead: [],
    };


  }

  componentDidMount() {

    axios.get('/retrieve_book')
      .then(({data: {books}}) => {
        this.setState({wantToRead: books})
      });
  }

  handleChange = (e) => {
      this.setState({searchTerm: e.target.value});
  }


  handleClick = (e) => {
    axios.post('/book_search', {
      searchTerm: this.state.searchTerm
    }).then(res => {
      this.setState({ books: res.data.items })
    })
    .catch(({response}) => console.log('error fetching search'));
  }

  deleteBook = (book) =>{
    const bookid = book.id

    axios.post('/delete_book', {bookid});
    this.setState(({wantToRead}) => ({
      wantToRead: wantToRead.filter(book => book.id !== bookid)
    }))
  }

  btnClick = (book) =>{

    axios.post('/insert_book', {book})
        this.setState(({wantToRead})=>({wantToRead: wantToRead.concat(book)}))
  }


  render() {
    const { searchTerm, books, wantToRead} = this.state;

    const divStyle = {
      backgroundColor: '#EE9617'
    };

    const textStyle = {
      color: '#2A2A72',
    };
    const divStyle2 = {
      position: 'absolute',
      top: '450px',
      right: '0',
      width: '300px',
      height: '250px',
      border: '3px solid #73AD21',
      backgroundColor: 'white',
    };
  

    return (
      <div style={divStyle} className="App">

        <div style = {divStyle2}>
      <h5>Want To Read</h5>
      {
        wantToRead.map((readBook,i) => (
          <div key={readBook.id}>
            {
              readBook.volumeInfo && readBook.volumeInfo.title || readBook.name
            }
             <button onClick={() => this.deleteBook(readBook)}>Delete
            </button>
           </div> 
        ))
      }
        </div>
        <h1 style={textStyle}>Book Searcher</h1>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleClick} >Search</button>
        <div >
          {books.map((book, i) => (
            <div key={i}>
          
           <a href={book.volumeInfo.infoLink} >
             {book.volumeInfo.imageLinks && <img  src={book.volumeInfo.imageLinks.thumbnail} />}
           </a>
           <button onClick = {() => this.btnClick(book)} >Add to list
           </button> 
           </div>

          ))}
        </div>

      </div>
    );
  }
}

export default App;
