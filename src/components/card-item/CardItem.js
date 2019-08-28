import { CardStatus } from "../../constants/CardStatus";
import { Image } from "react-bootstrap";
import React, { Component } from 'react';
import './CardItem.css';
import ReactCardFlip from 'react-card-flip';
import { connect } from "react-redux";
import * as actions from "../../actions";

export class CardItem extends Component {

  componentDidMount() {
    this.timeouts = [];
  }

  constructor(props) {
    super(props);
    this.state = {
      isFlipped: this.props.card.status === CardStatus.OPENED
    };
    this.handleClick = this.handleClick.bind(this);
  }

  flipCard = (card) => {
    if (card.status === CardStatus.MATCHED || (this.props.firstGuess && this.props.secondGuess)) {
      return;
    }
    if (!this.props.firstGuess) {
      this.props.flipCard(card);
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    } else if (this.props.firstGuess.id !== card.id) {
      this.props.flipCard(card);
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      if (this.props.firstGuess.image !== card.image) {
        this.timeouts.push(setTimeout(() => {
          this.props.checkForPair();
          this.setState({isFlipped: false});
        }, 2500));
      } else {
        this.timeouts.push(setTimeout(() => this.props.checkForPair(), 600));
      }
    }
  };

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.flipCard(this.props.card);
  };

  render() {
    return (
      <div>
        { this.props.card.status === CardStatus.MATCHED ?
          <div className={"matchedContainer"}>
            <div className={"imageContainer"}>
              <Image src={'/images/cards/' + this.props.card.image}/>
            </div>
          </div> :

      <ReactCardFlip isFlipped={this.props.card.status !== CardStatus.CLOSED} flipDirection="vertical">
        <div onClick={this.handleClick} className={"m-2 p-3 " + (this.props.card.status === CardStatus.MATCHED ? 'matchedCard' : 'card')} key={"front"}>
          <div className={"imageContainer"}>
          </div>
        </div>
        <li onClick={this.handleClick} key="back" className={"m-2 p-3 " + (this.props.card.status === CardStatus.MATCHED ? 'matchedCard' : 'card')}>
          <div className={"imageContainer"}>
            <Image src={'/images/cards/' + this.props.card.image}/>
          </div>
        </li>
      </ReactCardFlip>
      }
      </div>
    )
  }

}
const mapStateToProps = state => {
  return {
    firstGuess: state.card.firstGuess,
    secondGuess: state.card.secondGuess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    flipCard: (card) => dispatch(actions.flipCard(card)),
    checkForPair: () => dispatch(actions.checkForPair())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
