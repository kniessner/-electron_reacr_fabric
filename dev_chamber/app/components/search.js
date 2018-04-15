import React, { Component } from "react";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "Bob" };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleInput(e) {
    this.setState({ name: e.target.value });
  }
  handleSearch(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }
  render() {
    const { name } = this.state;
    <h2>HELLO: {name}</h2>
    <form className="search" onSubmit={this.handleSearch}>
      <input onChange={this.handleInput} type="search" placeholder="Search" />
      <button type="submit" className="btn">
        Search
      </button>
    </form>;
  }
}

export default Search;
