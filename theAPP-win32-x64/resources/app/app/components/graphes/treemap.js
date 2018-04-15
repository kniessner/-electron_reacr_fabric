import React, { Component } from "react";

class TreeMap extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      var data = this.props.data;
      var self = null,
        margin = { top: 20, right: 0, bottom: 0, left: 0 },
        width = 100, // % of the parent element
        height = 100,
        x = d3
          .scaleLinear()
          .domain([0, width])
          .range([0, width]),
        y = d3
          .scaleLinear()
          .domain([0, height])
          .range([0, height]),
        node,
        nodes = 0,
        cell = 0;

      var blue = d3.hsl(216, 0.92, 0.68),
        color = d3.scaleOrdinal().range(
          [
            d3.rgb(blue).brighter([0.25]),
            d3.rgb(blue),
            d3.rgb(blue).darker([0.25])
          ].map(function(c) {
            c = d3.rgb(c);
            return c;
          })
        );

      var formatNumber = d3.format(",d");
      function sumByCount(d) {
        return d.children ? 0 : 1;
      }

      function sumBySize(d) {
        return d.size;
      }

      var treemap = d3
        .treemap()
        .size([width, height])
        .tile(d3.treemapBinary)
        .paddingInner(0)
        .round(true);

      var graph = d3.select("#treemap .graph");
      var graphhead = d3.select("#graph_head");

      loadTreemap(data);
      function loadTreemap(data) {
        var root = d3
          .hierarchy(data)
          .eachBefore(function(d) {
            d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.Name;
          })
          .sum(sumBySize)
          .sort(function(a, b) {
            return b.height - a.height || b.value - a.value;
          });

        treemap(root);
        graph.selectAll(".node").remove();
        graphhead
          .selectAll(function(d) {
            return "." + root.data.Name ? root.data.Name : root.id;
          })
          .remove();
        graphhead
          .append("p")
          .attr("class", function(d) {
            return "history" + root.data.Name ? root.data.Name : root.id;
          })
          .on("mousedown touchstart", function(d) {
            loadTreemap(root.data);
          })
          .text(function(d) {
            return root.data.Name ? root.data.Name : root.id;
          });

        var cell = graph
          .selectAll(".node")
          .data(root.descendants()) // .leaves()
          .enter()
          .append("div")
          .attr("class", function(d) {
            return "node  level-" + d.depth;
          })
          .attr("title", function(d) {
            return d.data.Name ? d.data.Name : "null";
          });

        cell
          .style("left", function(d) {
            return Math.round(x(d.x0)) + "%";
          })
          .style("top", function(d) {
            return Math.round(y(d.y0)) + "%";
          })
          .style("width", function(d) {
            return x(d.x1 - d.x0) + "%";
          })
          .style("height", function(d) {
            return y(d.y1 - d.y0) + "%";
          })
          .style("background-color", function(d) {
            while (d.depth > 1) d = d.parent;
            return color(d.data.Name);
          })
          .on("mousedown touchstart", function(d) {
            loadTreemap(d.data);
          })
          .append("p")
          .attr("class", "label")
          .text(function(d) {
            return d.data.Name ? d.data.Name : "null";
          });
      }
    }
  }

  render() {
    return (
      <div id="treemap" className="graph_box">
        <div className="graph_head" id="" />
        <div className="graph" />
      </div>
    );
  }
}
export default TreeMap;
