import React from "react";
import Product from "./Product";
import Title from "./Title";
// { storeProducts } from "../data";
import { ProductConsumer } from "../context";

class ProductList extends React.Component {
  render() {
    //console.log(this.state.products);
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="store" title="products" />

            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    //call back function
                    return <Product key={product.id} product={product} />;
                  }); //looping through the list of products
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;
