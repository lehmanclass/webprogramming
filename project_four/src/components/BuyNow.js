import React from 'react';
//import loginImg from './logo.svg';
import './style.css';

class BuyNow extends React.Component{
    constructor(props){
        super(props);
        this.state={
           
         firstname: '',
        lastname: '',
        address: '',
        cvv:'', cardnumber:'',
        expdate: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick = (event) => {
       
        
        event.preventDefault();
        const {name, password, email } = this.state;
        fetch('http://localhost:5000/paymentinfo',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: {
            "firstname":this.state.firstname,
            "lastname":this.state.lastname,
            "address":this.state.address,
            "cvv":this.state.cvv,
             "cardnumber":this.state.cardnumber,
           "expdate":this.state.expdate
            
             }

       
       })
    .then(response => response.json()).then(output => console.warn(output))
    }


    render(){
        return(
        <div className="base-contanier">
            <img src= "http://superkidsdenti.wpengine.com/wp-content/uploads/2015/04/VisaMCDisc.png" className="card-logo"  />
            <div className="header">Card Information</div>
            <div className="content">
            
                <div className="form">
                <div className="form-group">
                    <label htmlFor="name">First Name(As Written in the card)</label>
                    <input type ="text" value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })} name="First Name" placeholder="First Name" />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Last Name(As Written in the card)</label>
                    <input type ="text" value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })} name="Name" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="Address">Address, City, State, ZIP code</label>
                    <input type ="text" value={this.state.address} onChange={e => this.setState({ address: e.target.value })}name="address" placeholder="Address" />
                </div>


                <div className="form-group">
                    <label htmlFor="number">Card Number</label>
                    <input type ="number" value={this.state.cardnumber} onChange={e => this.setState({ cardnumber: e.target.value })} name="number" placeholder="number" />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Experation Date</label>
                    <input type ="number" value={this.state.expdate} onChange={e => this.setState({ expdate: e.target.value })}name="number" placeholder="month/year" />
                </div>
                <div className="form-group">
                    <label htmlFor="number">cvv</label>
                    <input type ="number" value={this.state.cvv} onChange={e => this.setState({ cvv: e.target.value })} name="number" placeholder="cvv" />
                    
                </div>

            </div>
            </div>
     <div className="footer">
     <button type="submit"  onClick={this.handleClick} className="btn">Pay</button>
        
     </div>
        </div>
        );
    }
}
export default BuyNow;