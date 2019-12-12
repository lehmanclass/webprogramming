import React from 'react';
import Nav from './Nav';

class Progress extends React.Component{
    render(){
        return (
            <div>
                <Nav logout={this.props.logout} />
                <h1>Progress page Baby</h1>
            </div>
        )
    }
}


export default Progress;