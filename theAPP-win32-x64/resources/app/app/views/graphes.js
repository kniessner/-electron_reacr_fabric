import React, { Component } from "react";
import Api from "../helpers/api";
import DirectedGraph from "../components/graphes/directed_graph.js";

import ForceGraph from "../components/graphes/force_view";
import TreeMap from "../components/graphes/treemap";
import Bubble from "../components/graphes/bubble";
//import RadialTree from "../components/graphes/RadialTree";


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
    console.log(this.props.data);
    return <div id="graphes" className="container text-center">
        {this.props.data.hierarchical_data.length > 0 ? <DirectedGraph nodes={this.props.data.nodes} links={this.props.data.links} data={this.props.data.hierarchical_data} /> : ""}
        {this.props.data.tree_roots.length > 0 ? <ForceGraph data={this.props.data.tree} /> : ""}
        {/* this.props.data.hierarchical_data.length > 0 ? <RadialTree data={this.props.data.hierarchical_data} /> : "" */}
        {this.props.data.tree_roots.length > 0 ? <TreeMap data={this.props.data.tree} /> : ""}
        {this.props.data.tree_roots.length > 0 ? <Bubble data={this.props.data.tree} /> : ""}
      </div>;
  }
}

export default Table;
