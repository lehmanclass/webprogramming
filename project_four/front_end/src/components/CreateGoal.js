import React from "react";

class CreateGoal extends React.Component {

  
  render() {
    return (
      <div className="create-goal-container">
        <div>
          <h2>Create Goal</h2>
        </div>
        <div className="create-goal-inputs-container">
          <div>
            <input placeholder="name" />
          </div>
          <div>
            <textarea>Why</textarea>
          </div>
          <div>
            <textarea>Description</textarea>
          </div>
          
          <div>
            <input />
          </div>

          <button onClick={() => this.props.createGoal(this.state.goalInfo)}>Create</button>
        </div>
      </div>
    );
  }
}


export default CreateGoal; 