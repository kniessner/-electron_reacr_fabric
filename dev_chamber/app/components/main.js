import React from "react";
import PrepareArrays from "../helpers/prepareArrays.js";

import Navbar from "./navbar";
import Footer from "./footer";
import App from "./app";
var table_content;
import io from "socket.io-client";
var socket = io.connect("http://localhost:5000");
//ipcRenderer.send("main", "onload");

socket.on("connect", function() {
  document.ondragover = document.ondrop = ev => {
    ev.preventDefault();
  };
  socket.emit("load_last_file", true);

  document.body.ondrop = ev => {
    ev.preventDefault();
    var file = ev.dataTransfer.files[0].path;
    socket.emit("load_new_file", file);
  };
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      files: [],
      hierarchical_data: [],
      sheetnames: [],
      links: [],
      nodes: [],
      tree_roots: [],
      tree: []
    };
    this.PrepareArrays = PrepareArrays.bind(this);
  }
  componentWillMount() {
    var that = this;

    socket.on("data", function(data) {
      console.log("got data", data);
      that.PrepareArrays(data);
    });



    /*ipcRenderer.on("data", function(event, data) {
      console.log("got data");
      that.PrepareArrays(data);
    }); */
  }
  componentDidMount() {
    // Do something when loaded
  }
  render() {
    var data = this.state;
    if (data.hierarchical_data.length > 0) {
      var children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, {
          data: data
        });
      });
    }

    return (
      <div id="app" style={{ textAlign: "center" }}>
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </div>
    );
  }
}

export default Main;
