import React from "react";

export default class Greeting extends React.Component {
  state = { show: false, name: "ji" };
  showHide = () => {
    this.setState({ ...this.state, show: !this.state.show });
    setInterval(() => {
      this.setState({ ...this.state, name: "hi" });
    }, 2000);
  };
  render() {
    console.log("parent...\n\n\n");
    return (
      <>
        <button onClick={this.showHide}>show/hide</button>
        <PureComp />
        {this.state.show ? <Test show={this.state.show} /> : null}
      </>
    );
  }
}

class Test extends React.Component {
  state = { name: "" };

  componentDidMount() {
    console.log("mounted");
  }
  componentDidUpdate() {
    console.log("updated");
  }
  componentWillUnmount() {
    
    console.log("unmounted");
  }

  render() {
    console.log("chid...\n\n\n");
    return (
      <>
        <h1>Test {this.state.name}</h1>
        <input
          type="text"
          onChange={(e) => {
            this.setState({ name: e.target.name });
          }}
        />
      </>
    );
  }
}

class PureComp extends React.PureComponent {
  render() {
    console.log("pure comp...\n\n\n");
    return <h1>Pure comp...</h1>;
  }
}
