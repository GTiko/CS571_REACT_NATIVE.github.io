import React from "react";

export default class LimitCharacter extends React.Component {
    state = { show: false }
    showHide = () => {
        this.setState({ show: !this.state.show });
    }
    render() {
        return (
            <>
                <button onClick={this.showHide}>{this.state.show ? "hide" : "show"}</button>
                {this.state.show ? <LimitedTextArea character={20} /> : null}
            </>
        )
    }
}

class LimitedTextArea extends React.Component {
    state = { newPost: "", postTweet: false }
    componentDidMount() {
        console.log("mounted...");
    }
    componentDidUpdate() {
        console.log("update");
    }
    componentWillUnmount() {
        console.log("un-mounted");
    }
    handleChange = (e) => {
        this.setState({ ...this.state, newPost: e.target.value })
    }
    post = () => {
        this.setState({ ...this.state, postTweet: true });
    }
    render() {
        return (
            <>
                <h1>TextArea</h1>
                <textarea
                    cols="30" rows="10"
                    onChange={this.handleChange}
                    maxLength={this.props.character}>
                </textarea> <br />
                Remaining character :{this.props.character-(this.state.newPost).length}/{this.props.character}

                <br />
                {this.state.postTweet ? <PostNewTweet newPost={this.state.newPost} /> : null} <br />
                <button onClick={this.post}>post</button>
            </>
        )
    }
}

class PostNewTweet extends React.Component {
    render() {
        return (
            <>{this.props.newPost}</>
        )
    }
}