import React from "react";
import {STATUS} from '../constants';

class CreateGoal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name:'',
      reason:"",
      description:'',
      status: STATUS.NO_STARTED
    }
  }

  handleName = (e) => this.setState({name: e.target.value})

  handleReason = (e) => this.setState({reason: e.target.value})

  handleDescription = (e) => this.setState({description: e.target.value})

  
  render() {
    const {name, reason, description} = this.state;
    
    return (
      <div className="overlay">
        <span className='closeModal' onClick={this.props.hide}>X</span>
      <div className="create-goal-container modal">
        <div>
          <h2>Create Goal</h2>
        </div>
        <div className="create-goal-inputs-container">
          <div>
            <input value={name} onChange={this.handleName}placeholder="name" />
          </div>
          <div>
            <label>Why</label>
            <textarea value={reason} onChange={this.handleReason}></textarea>
          </div>
          <div>
            <label>Description</label>
            <textarea value={description} onChange={this.handleDescription}></textarea>
          </div>

          <button onClick={() => this.props.createGoal(this.state)}>Create</button>
        </div>
      </div>
      </div>
    );
  }
}


export default CreateGoal; 