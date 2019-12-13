import React from 'react';
import './TwiterPage.css'
import {Link, Redirect} from 'react-router-dom';
import { KEYS } from 'eslint-visitor-keys';

class TwitterPage extends React.Component {
    constructor(){
        super()
        this.state = {
            id: null,
            tweets:[],
            users:[],
            searchTerm: "",
            tweetText:"",
            searchTweet:"",
            isAuth: true
        }
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        if (!id) {
            this.setState({
                isAuth: false
            })
            return;
        } else {
            id = Number(id);
            this.setState({id});
        }

        this.getTweets(id);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ 
            [name]: value
        });

    }

    handleSubmit = (event) => {
     event.preventDefault();

     const { textarea } = this.state;

     fetch('/tweet/validation', {
         method:'post',
         body:JSON.stringify({
             id: textarea

         }),
         headers: {
             'Content-type': 'application/json'
         }

     }).then(data => data.json())
     .then((data) => {
         console.log(data);
     });
   
    }

    handleCreateTweet = (event) => {
        event.preventDefault();
        
        const { id, tweetText } = this.state;
        fetch('/tweet/createTweet', {
            method:'post',
            body:JSON.stringify({
                userId: id,
                tweetText

            }),
            headers: {
                 'Content-Type': 'application/json'
            }
           

        })
        .then((data) => data.json())
        .then(newData => {
            const tweets = this.state.tweets;
            tweets.splice(0, 0, newData.tweet);

            this.setState({
                tweets,
                tweetText: ''
            });
        })
        
     
    }

    getTweets = (id) => {

        fetch(`/tweet/tweets/${id}` , {
            method:'get'
        }).then(data => data.json())
        .then((data) => {
            const tweets = data.tweets;
            this.setState({tweets});
        });
     

    }

    logout = () => {
        localStorage.removeItem('id');

        this.setState({
            isAuth: false
        });
    }

    getUsers = (searchTerm ) => {
       
        fetch(`/tweet/users/${searchTerm}`, {
            method:'get'
        }).then(data => data.json())
        .then((data) => {
            const users = data.users
            this.setState({users, searchTerm: ''});
            console.log(users);
        })
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            const{ searchTerm } = this.state;
            this.getUsers(searchTerm)
            //console.log('search for', this.state.searchTerm);
        }
    }



    render() {
        const {tweetText, searchTerm, isAuth , tweets, users} = this.state;


        if (!isAuth) {
            return <Redirect to="/"/>
        }

        return(
            <div>
               

              


            <div className="display-search-user">
                <div className="search-container">
                    <input
                        className="search-tweeter" 
                        type="text" 
                        name="searchTerm"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={this.handleChange}
                        onKeyDown={this.handleEnter}
                    ></input>
                    <div className="search-results">
                        {users.map(user => (
                            <div className="search-user" key={user.id}>{user.username}</div>
                        ))}
                    </div>
                </div>
               
        
                <button className="button-logout" onClick={this.logout}>
                    Log out
                </button>
            </div>


              
             <div className="main-tweet">   
                <form className="tweet-form" onSubmit={this.handleCreateTweet}>

                    
                    <textarea 
                    id="twitte-text-area" 
                    name="tweetText" 
                    placeholder="What's happening?"
                    cols={80} rows={8} 
                    value={tweetText}
                    onChange={this.handleChange} ></textarea>

                    <br/>

                    <button className="button-tweet">Tweet</button>

                </form>
          

                <div className="post--your-tweet">
                    {tweets.map(tweet => (
                        <div  className="post--your-tweet" key={tweet.id}>
                            <span className="tweet-username">{tweet.username}</span>
                            <div className="tweet-tweet">{tweet.tweet}</div>
                            
                        </div>
                    ))}
                </div>
    
            </div>

            </div>
            
        )

    }
    
}
export default TwitterPage;
// {tweets.map(tweet => (<div>{tweet.tweet}</div>))}