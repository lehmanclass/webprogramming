import React, { Component } from "react";
import styled from "styled-components";

export default class Checkout extends Component {
  render() {
    return (
      <DivContainer className="col-50">
        <form>
          <h3>Payment</h3>
          <label>Accepted Cards</label>
          <div className="icon-container">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-amex"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-discover"></i>
          </div>
          <label>Name on Card</label>
          <input
            type="text"
            id="cname"
            name="cardname"
            placeholder="John More Doe"
          />
          <label>Credit card number</label>
          <input
            type="text"
            id="ccnum"
            name="cardnumber"
            placeholder="1111-2222-3333-4444"
          />
          <label>Exp Month</label>
          <input
            type="text"
            id="expmonth"
            name="expmonth"
            placeholder="September"
          />
          <div className="row">
            <div className="col-50">
              <label>Exp Year</label>
              <input
                type="text"
                id="expyear"
                name="expyear"
                placeholder="2018"
              />
            </div>
            <div className="col-50">
              <label>CVV</label>
              <input type="text" id="cvv" name="cvv" placeholder="352" />
            </div>
          </div>

          <input type="submit" value="Make Payment" className="btn" />
        </form>
      </DivContainer>
    );
  }
}

const DivContainer = styled.div`
  .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0 -16px;
  }

  .col-50 {
    -ms-flex: 50%;
    flex: 50%;
    padding: 0 16px;
  }

  input[type="text"] {
    width: 100%;
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  label {
    margin-bottom: 10px;
    display: block;
  }

  .icon-container {
    margin-bottom: 20px;
    padding: 7px 0;
    font-size: 24px;
  }

  .btn {
    background-color: #4caf50;
    color: white;
    padding: 12px;
    margin: 10px 0;
    border: none;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    font-size: 17px;
  }

  .btn:hover {
    background-color: #45a049;
  }
`;
