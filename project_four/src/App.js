import React from 'react';

const Welcome = ({user, onSignOut})=> {
  return (
    <div>
      Welcome <strong>{user.username}</strong>
      <button onClick={onSignOut}> Sign out</button>
    </div>
  )
}

class LoginForm extends React.Component { 

  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onSignIn(username, password)
  }
  
  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Login" />
      </form>
    )
  }

}

class App extends React.Component {
  // the initial app state
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  
  // FUNCTIONS:
  // The following are functions that modify app state
  signIn(username, password) {
    this.setState({
      user: {
        username,
        password,
      }
    })
  }
  
  signOut() {
    this.setState({user: null})
  }

  render() {                                                                         
    return (
    <div>
        <h1>Buzz and Cutz</h1>
        { 
          (this.state.user) ? 
            <Welcome 
             user={this.state.user} 
             onSignOut={this.signOut.bind(this)} 
            />
          :
            <LoginForm 
             onSignIn={this.signIn.bind(this)} 
            />
        }
      </div>
    )
    
  }
  
}

export default App;
