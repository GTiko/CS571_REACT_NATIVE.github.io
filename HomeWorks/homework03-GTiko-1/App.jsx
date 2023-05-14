import "../App.css";
import React from "react";

class App extends React.Component {
  state = { show: false };
  handleShowHide = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleShowHide}>
          {this.state.show ? "Hide" : "Show"}
        </button>
        {this.state.show && <LimitedTextArea characters="200" />}
      </div>
    );
  }
}

class LimitedTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      characters: this.props.characters,
      remainingCharacter: this.props.characters,
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    const remainingCharacter = this.state.characters - value.length;
    this.setState({
      ...this.state,
      value: e.target.value,
      remainingCharacter: remainingCharacter,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Limited Text Area</h1>
        <textarea
          cols="30"
          rows="10"
          maxLength={this.state.characters}
          onChange={this.handleChange}
        ></textarea>
        <br />
        Remaining character: {this.state.remainingCharacter}/
        {this.state.characters}
      </div>
    );
  }
}

export default App;
