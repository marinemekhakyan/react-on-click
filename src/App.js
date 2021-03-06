import React, { Component } from "react";
import Cards from "./components/Cards";
import Wrapper from "./components/Wrapper";
import Heading from "./components/Heading";
import Jumbotron from "./components/Jumbotron";
import cards from "./cards.json";

class App extends Component {
  state = {
    cards,
    score: 0,
    topScore: 0,
    message: "Each art piece must only be clicked once! Click on one to start!",
    clicked: []
  };

  componentDidMount() {
    console.log(this.state.cards)
    this.setState({ cards: this.shuffle(this.state.cards) });
  
  }

  handleOnClick = id => {
    if (this.state.clicked.includes(id)) {
      this.setState({
        cards: this.shuffle(this.state.cards),
        score: 0,
        message: "Incorrect!",
        clicked: []
      });
    } else {
      this.setState({
        cards: this.shuffle(this.state.cards),
        score: this.state.score + 1,
        topScore: this.state.score + 1 > this.state.topScore ? this.state.score + 1 : this.state.topScore,
        message: "",
        clicked: this.state.clicked.concat(id)
      });
    }
  };

  shuffle = cards => {
    let newCards = cards.sort(() => Math.random() - 0.5);
    return newCards;
  };

  render() {
    return (
      <div>
        <Jumbotron
          message={this.state.message}
          score={this.state.score}
          topScore={this.state.topScore}
        ></Jumbotron>
        <Heading />
        <Wrapper>
          {this.state.cards.map(card => (
            <Cards
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
              handleOnClick={this.handleOnClick}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;