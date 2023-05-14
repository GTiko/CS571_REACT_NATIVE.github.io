import React from "react";


class Slides extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.slides.title}</h1>
        <ul>
          {this.props.slides.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Slides;