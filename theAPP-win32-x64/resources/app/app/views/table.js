import React, { Component } from "react";
import Api from "../helpers/api";
import DataTable from "../components/data_table.js";

class Table extends Component {
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
    return <div id="table">
        {this.props.data.hierarchical_data.length > 0 ? <DataTable data={this.props.data.hierarchical_data} /> : ""}
      </div>;
  }
}

export default Table;
