import React from 'react';
import CardContainer from "./containers/card/CardContainer";
import StartScreen from "./components/start-screen/StartScreen";
import { connect } from "react-redux";
import './App.css';

function App() {
  return (
    <div className="App">
      <StartScreen/>
      <CardContainer/>
    </div>
  );
}

export default connect(null, null)(App);
