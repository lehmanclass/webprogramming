import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Component } from "react";
//import Login from "../Login";

export default class CartTotals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: Boolean(localStorage.getItem("id")),
      redirect: false
    };
  }
  proceedButton = event => {
    this.setState({ redirect: true });
  };
  render() {
    const { cartSubtotal, cartTax, cartTotal, clearCart } = this.props.value;
    const { authed, redirect } = this.state;
    if (redirect && authed) {
      return <Redirect to="/checkout" />;
    } else if (redirect && !authed) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => clearCart()}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className="text-title">subtotal:</span>
                <strong>$ {cartSubtotal}</strong>
              </h5>
              <h5>
                <span className="text-title">tax:</span>
                <strong>$ {cartTax}</strong>
              </h5>
              <h5>
                <span className="text-title">total:</span>
                <strong>$ {cartTotal}</strong>
              </h5>
              <button
                className=" btn-outline-primary text-uppercase mb-3 px-5"
                type="button"
                onClick={this.proceedButton}
              >
                proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
