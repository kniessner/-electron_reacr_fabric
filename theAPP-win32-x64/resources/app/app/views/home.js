import React, { Component } from "react";1
import Api from "../helpers/api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "Bob" };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // Do something when loaded
  }

  handleInput(e) {
    this.setState({ name: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
    Api.getThing().then(data => {
      console.log(data);
    });
  }

  render() {
    console.log('Home template props', this.props);
    const { name } = this.state;
    return (
      <div id="home" className="container text-center">
        <img src="assets/apple-icon.png" width="100" alt="Black box" />
      </div>
    );
  }
}

export default Home;
