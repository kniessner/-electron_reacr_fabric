import * as d3 from "d3";
import React, { Component } from "react";
class DirectedGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0.5 };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  componentDidMount() {
    if (this.props.nodes && this.props.links) {
      var nodes = this.props.nodes;
      var total_nodes = nodes.length;
      var links = this.props.links;
      var nodes_url = "https://api.myjson.com/bins/1dedy1";
      var edges_url = "https://api.myjson.com/bins/74lzt";

      var marker = d3
        .select("svg")
        .append("defs")
        .append("marker")
        .attr("id", "Triangle")
        .attr("refX", -22)
        .attr("refY", 6)
        .attr("fill", "white")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("markerWidth", 12)
        .attr("markerHeight", 18)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 0 6");

      var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var simulation = d3
        .forceSimulation()
        .force(
          "link",
          d3.forceLink().id(function(d) {
            return d.id;
          })
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

      createForceLayout(nodes, links);
      d3.select("input[type=range]").on("input", inputted);
      function createForceLayout(nodes, links) {
        var g = svg.append("g").attr("class", "everything");

        var zoom_handler = d3.zoom().on("zoom", zoom_actions);

        zoom_handler(svg);

        function zoom_actions() {
          g.attr("transform", d3.event.transform);
        }

        var link = g
          .append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links)
          .enter()
          .append("line")
          .attr("class", "link");

        var lable = link.append("title").text(function(d) {
          return d.name;
        });
        var node = g
          .append("g")
          .attr("class", "nodes")
          .selectAll("gregorMendel")
          .data(nodes)
          .enter()
          .append("g")
          .attr("class", "node");

        var circles = node
          .append("circle")
          .attr("r", 5)
          /*.attr("r", function(d) {      
               d.weight = link.filter(function(l) {
                 return l.source.index == d.index || l.target.index == d.index
               }).size();      
               var minRadius = 5;
               return minRadius + (total_nodes - d.weight);
             })*/
          .style("fill", "lightgray")
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .call(
            d3
              .drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended)
          );

        var titles = node.append("title").text(function(d) {
          return d.id;
        });

        var text = node
          .append("text")
          .style("text-anchor", "middle")
          .attr("y", 15)
          .text(function(d) {
            return d.name;
          });

        d3.selectAll("line").attr("marker-start", "url(#Triangle)");

        simulation.nodes(nodes).on("tick", ticked);

        simulation.force("link").links(links);

        function ticked() {
          link
            .attr("x1", function(d) {
              return d.source.x;
            })
            .attr("y1", function(d) {
              return d.source.y;
            })
            .attr("x2", function(d) {
              return d.target.x;
            })
            .attr("y2", function(d) {
              return d.target.y;
            });

          node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
        }
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      function zoomed() {
        svg.attr(
          "transform",
          "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
        );
      }

      function inputted() {
        simulation.force("link").strength(+this.value);
        simulation.alpha(1).restart();
      }
    }
  }

  render() {
    return (
      <div id="directed_graph" className="graph_box treegraph graph_container">
        <input
          width="960"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <svg className="graph" width="800" height="600" />
      </div>
    );
  }
}

export default DirectedGraph;
