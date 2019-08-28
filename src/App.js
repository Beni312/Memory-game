import React, { Component } from 'react';
import CardContainer from "./containers/card/CardContainer";
import StartScreen from "./components/start-screen/StartScreen";
import StatisticContainer from "./containers/statistic/StatisticContainer";
import { connect } from "react-redux";
import { CustomNavbar } from "./containers/navbar/CustomNavbar";
import './App.css';

class App extends Component {

  render() {
    return(
      <div className="App">
        <CustomNavbar/>
        {this.props.cards.length > 0 ? <StatisticContainer/> : null}
        {this.props.cards.length === 0 ? <StartScreen/> : null}
        <CardContainer/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.card.cards
  };
};

export default connect(mapStateToProps, null)(App);
