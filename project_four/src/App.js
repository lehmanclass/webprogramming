import React from "react";
import "./App.css";

// const PORT = 5000;

class Clinicall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      name: null,
      human: null,
      reason: "Walk-in"    
    };

  }

  handleInput = (e) => {
    const { value } = e.target;

    this.setState({
      name: value
    });
    console.log(e.target.value);
  }

  handleRadioClick = (e) => {
    const { value } = e.target;
    
    this.setState({
      human: value === 'human'
    });
    console.log(e.target.value);
  }

  handleSelectClick = (e) => {
    const { value } = e.target;

    this.setState({
      reason: value
    });
    console.log(e.target.value);
  }

  handleSubmitClick = (e) => {
    e.preventDefault();

    const {name, human, reason} = this.state;
    
    fetch('/clinic/appointments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client: name,
        human,
        reason
      })
    }).then(data => data.json())
      .then(() => {
        this.setState({
          name: '',
          human: null,
          reason: 'Walk-in'
        })
      });
  }

  render() {
    // console.log(this.state.human);
    return (
      <React.Fragment>
        <header id="header">
          <h1> Welcome to Clinic-All</h1>
        </header>

        <main>
          {/* Landing page */}
          <section id="user">
            
            <form onSubmit={this.handleSubmitClick}>
              <div id="form">

                <label htmlFor="name">Your name</label>
                <input type="text" placeholder="Enter your name" name="name" required onInput={this.handleInput}/>

                <label>Are you human or animal?</label> 
                <label><input type="radio" name="species" value="human" required onClick={this.handleRadioClick} /> Human</label>
                <label><input type="radio" name="species" value="animal" required onClick={this.handleRadioClick} /> Animal</label>

                <select name="reason" id="reason" value="Walk-in" required onChange={this.handleSelectClick} >
                  <option value="Walk-in">Walk-in</option>
                  <option value="Appointment">Appointment</option>
                </select>

                <input type="submit" value="Submit" />

              </div>
            </form>

          </section>

          {/* FOOTER */}
          <section id="footer">
            
          </section>

        </main>
      </React.Fragment>
    );
  }
}

export default Clinicall;
