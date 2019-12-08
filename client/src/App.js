import React, {Fragment}from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Alert from "./components/layout/alert"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
// import logo from './logo.svg';
import {Provider} from "react-redux"
import store from "./store"
import './App.css';

const App=()=>{
  return (
   <Provider store={store}>
      <Router>
    <Fragment>
      <Navbar/>
      {/* <Landing/> */}
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
        <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
        </Switch>

      </section>
    </Fragment>
    </Router>
   </Provider>
  );
}

export default App;
