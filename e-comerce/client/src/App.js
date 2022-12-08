import React, { Component, useState, useEffect } from 'react';
import Home from './Pages/Home/index';
import ProductList from './Pages/ProductList/index';
import axios from 'axios';
import AdminLogin from './components/AdminLogin'
import AdminProduct from './Pages/Admin/'
import ProductDetail from './Pages/ProductDetail/'
import {useDispatch, useSelector} from 'react-redux';
import Order from './Pages/Order/'
import {loginPopup} from './actions'
import {logout} from './actions/auth'
import {CLEAR_ALL} from './actions/types'
import userService from './services/user.service'

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

function App(props) {
  const dispatch = useDispatch();

  const user = useSelector(state=> state.auth);
  console.log("user: ", user);
  const [apiResponse, setApiRes] = useState("");
  const [dbResponse, setDbRes] = useState("");

  useEffect(async () => {
    if(user.isLoggedIN){
      const response = await userService.getNothing();
      if(response.status == 401){
        dispatch(logout());
      }
    }
  },[]);



    return (
      <Router>
      <div className="App">
      <Switch>
        <Route path="/"  exact component={Home}/>
        <Route path='/product/:product_id' component={ProductDetail}/>
        <Route path='/shop/' exact component={ProductList}/>
        <Route path='/shop/:gender' exact component={ProductList}></Route>
        <Route path='/shop/:gender/:bodyPart' component={ProductList}></Route>
        <Route path='/search' component={ProductList}></Route>
        <Route path='/cart/' >
          {user.isLoggedIN ? <Order/> : <Redirect to='/'/>}
        </Route>
        <Route path='/admin/' exact component={AdminLogin}>
          {user?.user?.roles ? (user.user.roles[0] == 'ROLE_ADMIN' ? <Redirect to="/admin/product"/> : <AdminLogin/>): <AdminLogin/>}
        </Route>
        <Route path='/admin/product' >
          {user?.user?.roles ?  (user.user.roles[0] == 'ROLE_ADMIN' ? <AdminProduct/> : <Redirect to="/admin"/>) : <Redirect to="/admin"/>}
        </Route>
        <Route path='/admin/add-product' >
          {user?.user?.roles ?  (user.user.roles[0] == 'ROLE_ADMIN' ? <AdminProduct/> : <Redirect to="/admin"/>) : <Redirect to="/admin"/>}
        </Route>
        <Route path='/admin/order' >
          {user?.user?.roles ?  (user.user.roles[0] == 'ROLE_ADMIN' ? <AdminProduct/> : <Redirect to="/admin"/>) : <Redirect to="/admin"/>}
        </Route>
       {/* <p className="App-intro">{dbResponse}</p> */}
       </Switch>
      </div>
      </Router>
    );
  
}


export default App;
