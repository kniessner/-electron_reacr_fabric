import React, { Component } from "react";

//import Treemap from "react-d3-treemap";

// Include its styles in you build process as well
//import "react-d3-treemap/dist/react.d3.treemap.css";
//var d3 = require("d3");
//import * as d3 from 'd3';

class RadialTree extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      var classes = this.props.data;
      var diameter = 700,
        radius = diameter / 2,
        width = diameter,
        height = diameter,
        innerRadius = radius - 120;

      var cluster = d3.cluster().size([360, innerRadius]);

      var svg = d3
        .select("#RadialTree")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

      var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node"),
        g = svg
          .append("g")
          .selectAll(".node")
          .attr(
            "transform",
            "translate(" + (width / 2 + 40) + "," + (height / 2 + 90)
          );

      var stratify = d3.stratify().parentId(function(d) {
        if (d.data["path"]) {
          return d.data["path"].substring(0, d.data["path"].lastIndexOf("."));
        }
      });

      var tree = d3
        .tree()
        .size([2 * Math.PI, 500])
        .separation(function(a, b) {
          return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

      var root = packageHierarchy(classes).sum(function(d) {
        console.log(d);

        return d.size;
      });

      //root = root.;
      cluster(root);

      //var root = tree(stratify(root));

      link = link
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", function(d) {
          console.log("link", d);
          return "link group_" + d.source.data.group;
        })
        .attr(
          "d",
          d3
            .linkRadial()
            .angle(function(d) {
              return d.x / 180 * Math.PI;
            })
            .radius(function(d) {
              return d.y;
            })
        );

      var link = g
        .selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr(
          "d",
          d3
            .linkRadial()
            .angle(function(d) {
              return d.x;
            })
            .radius(function(d) {
              return d.y;
            })
        );

      link = link
        .data(packageImports(root.leaves()))
        .enter()
        .append("path")
        .each(function(d) {
          console.log(d[0]);
          (d.source = d[0]), (d.target = d[d.length - 1]);
        })
        .attr("class", "link")
        .attr(
          "d",
          d3
            .linkRadial()
            .angle(function(d) {
              return d.x;
            })
            .radius(function(d) {
              return d.y;
            })
        );

      node = node
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("class", function(d) {
          return (
            "node" +
            (d.data.children ? " node--internal " : " node--leaf ") +
            "stage_" +
            d.data.depth +
            " group_" +
            d.data.group
          );
        })

        .attr("dy", "0.31em")
        .attr("transform", function(d) {
          return (
            "rotate(" +
            (d.x - 90) +
            ")translate(" +
            (d.y + 20 * d.data.depth) +
            ",0)" +
            (d.x < 180 ? "" : "rotate(180)")
          );
        })
        .attr("text-anchor", function(d) {
          return d.x < 180 ? "start" : "end";
        })
        .text(function(d) {
          return d.data.Name;
        })
        .on("mouseover", mouseovered)
        .on("mouseout", mouseouted);

      /*var node = g
    .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "otherway node" + (d.data.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });
      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 20 * d.data.depth) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); });
*/
      node.append("circle").attr("r", 2.5);

      /*
 node.append("text")
      .attr("dy", "0.31em")
      .attr("x", function(d) { return d.x < Math.PI === !d.data.children ? 6 : -6; })
      //.attr("text-anchor", function(d) { return d.x < Math.PI === !d.data.children ? "start" : "end"; })
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
      .text(function(d) { return d.data.key; });
*/

      function radialPoint(x, y) {
        return [(y = +y) * Math.cos((x -= Math.PI / 2)), y * Math.sin(x)];
      }

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
          if (d.x && d.y) {
            return "translate(" + d.x + ", " + d.y + ")";
          } else {
            console.log(d);
          }
        });
      }

      function mouseovered(d) {
        node.each(function(n) {
          n.target = n.source = false;
        });

        link
          .classed("link--target", function(l) {
            if (l.target === d) return (l.source.source = true);
          })
          .classed("link--source", function(l) {
            if (l.source === d) return (l.target.target = true);
          })
          .filter(function(l) {
            return l.target === d || l.source === d;
          })
          .raise();

        node
          .classed("node--target", function(n) {
            return n.target;
          })
          .classed("node--source", function(n) {
            return n.source;
          });
      }

      function mouseouted(d) {
        link.classed("link--target", false).classed("link--source", false);

        node.classed("node--target", false).classed("node--source", false);
      }

      // Lazily construct the package hierarchy from class names.
      function packageHierarchy(classes) {
        var map = {};

        function find(path, data) {
          var node = map[path],
            i;
          if (!node) {
            node = map[path] = data || { path: path, children: [] };
            if (path.length) {
              node.parent = find(
                path.substring(0, (i = path.lastIndexOf(".")))
              );
              node.parent.children.push(node);
              node.key = path.substring(i + 1);
            }
          }
          return node;
        }

        classes.forEach(function(d) {
          console.log("d.data", d);
          if (d.path) {
            find(d.path, d);
          }
        });

        return d3.hierarchy(map[""]);
      }

      // Return a list of imports for the given array of nodes.
      function packageImports(nodes) {
        var map = {},
          imports = [];

        // Compute a map from name to node.
        nodes.forEach(function(d) {
          map[d.data.path] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
          if (d.data.imports)
            d.data.imports.forEach(function(i) {
              console.log("d.data.path", d.data.path);
              imports.push(map[d.data.path].path(map[i]));
            });
        });

        return imports;
      }
    }
  }
  render() {
          console.log("this.props.data", this.props.data);

    return <svg id="RadialTree" />;
  }
}

export default RadialTree;
