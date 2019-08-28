import React, { Component } from 'react';
import CardContainer from "./containers/card/CardContainer";
import Rules from "./components/rules/Rules";
import StartScreen from "./components/start-screen/StartScreen";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomNavbar from "./containers/navbar/CustomNavbar";
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <CustomNavbar/>
          <div className={"content"}>
            <Route path="/" exact component={StartScreen}/>
            <Route path="/game" component={CardContainer}/>
            <Route path="/rules" component={Rules}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, null)(App);
