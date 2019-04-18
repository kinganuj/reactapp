import React, { Component } from 'react';
import {Route,Switch} from "react-router-dom";
import Layout from "./containers/layout/layout"
import BurgerBuilder from "./containers/burgerbuilder/burgerbuilder";
import Checkout from "./containers/checkout/checkout";
import Orders from './containers/orders/orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>      
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          </Switch>                
        </Layout>        
      </div>
    );
  }
}

export default App;
