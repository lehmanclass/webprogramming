import React from 'react';
import Nav from './Nav';

class Home extends React.Component{
    render(){
        return (
            <div>
                <Nav logout={this.props.logout} />
                <h1>Home page Baby</h1>
            </div>
        )
    }
}


export default Home;