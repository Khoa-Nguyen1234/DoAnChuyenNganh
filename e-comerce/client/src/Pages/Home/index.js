import React, { Component } from 'react';
import Nav from '../../components/nav'
import Navbottom from '../../components/nav_bottom'
import Product from './components/Categories'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className="Home">
          <Nav></Nav>
          <Route path='/' exact to component={Product}></Route>
          <Navbottom></Navbottom>
      </div>
    );
  }
}


export default Home;