import "../App.css";
import React from "react";

class Tweeter extends React.Component {
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
        {this.state.show && <LimitedTextArea characters="20" />}
      </div>
    );
  }
}

class LimitedTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      reminder: this.props.characters,
    };
    this.characters = this.props.characters;
  }

  componentDidMount() {
    console.log("did-mount");
  }
  componentDidUpdate() {
    console.log("did-update");
  }
  componentWillUnmount() {
    console.log("un-mount");
  }

  handleChange = (e) => {
    const value = e.target.value;
    const remainingCharacter = this.characters - value.length;
    this.setState({
      ...this.state,
      value: e.target.value,
      reminder: remainingCharacter,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Limited Text Area</h1>
        <textarea
          cols="30"
          rows="10"
          maxLength={this.characters}
          onChange={this.handleChange}
        ></textarea>
        <br />
        Remaining character: {this.state.reminder}/{this.characters}
      </div>
    );
  }
}

export default Tweeter;
