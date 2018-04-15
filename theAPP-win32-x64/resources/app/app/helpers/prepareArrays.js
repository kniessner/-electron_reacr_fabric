export default function PrepareArrays(data){
    var child_array = [];
    var roots = [];
    var roots_counter = 0;
    var depth_max = 0;
    var links = [];
    var nodes = [];

    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var name;
      data[i]["isParent"] = false;
      data[i]["isChild"] = false;
      if( name = row["Name"]){
        var id = name.replace(" ", "-").toLowerCase();
      }else if(name = row["name"]){
        var id = name.replace(" ", "-").toLowerCase();
      }
      row["key"] = id.replace(" ", "-");
      var input = row["Input"];
      var output = row["Output"];
      data[i]["size"] = 5000;
      //console.log(output);

      if (output && output.includes(",")) {
        // if multiple outputs
        var outputs = output.split(",");

        for (var p = 0; p < outputs.length; p++) {
          // for every output
          var out = outputs[p];

          for (var x = 0; x < data.length; x++) {
            // loop through all table rows
            var name_x = data[x]["Name"];
            var id_x = name_x.replace(" ", "-").toLowerCase();

            if (!data[x]["key"]) {
              data[x]["key"] = id_x.replace(" ", "-");
            }
            var input_x = data[x]["Input"];

            if (!input_x) {
            } else if (input_x.includes(",")) {
              // if multiple inputs exists
              var inputs_x = input_x.split(",");
              for (var t = 0; t < inputs_x.length; t++) {
                var inp = inputs_x[t];

                if (data[x]["Name"] != name && inp === out) {
                  // if input is equal output

                  if (data[x]["key"] && data[i]["key"]) {
                    links.push({
                      source: data[i]["key"],
                      target: data[x]["key"],
                      name: inp,
                      type: ""
                    });
                  }

                  if (data[i]["parents"]) {
                    var parents = data[i]["parents"];
                    //parents.push(data[x]);
                    // data[i]['parents'] = parents;
                    data[i]["isChild"] = true;
                  } else {
                    var parents = [];
                    //parents.push(data[x]);
                    //data[i]['parents'] = parents;
                    data[i]["isChild"] = true;
                  }
                  if (data[x]["children"]) {
                    var children = data[x]["children"];
                    children.push(data[i]);
                    //console.log('children ',data[i],'added to ',data[x]);
                    data[x]["children"] = children;
                    data[x]["isParent"] = true;
                  } else {
                    var children = [];
                    children.push(data[i]);
                    //console.log('children ',data[i],'added to ',data[x]);
                    data[x]["children"] = children;
                    data[x]["isParent"] = true;
                  }
                }
              }
            } else {
              // if single inputs
              var outputs = output;
              if (data[x]["Name"] != name && input_x === out) {
                if (data[x]["key"] && data[i]["key"]) {
                  links.push({
                    source: data[i]["key"],
                    target: data[x]["key"],
                    name: input_x,
                    type: ""
                  });
                }

                if (data[i]["parents"]) {
                  var parents = data[i]["parents"];
                  data[i]["isChild"] = true;
                } else {
                  var parents = [];
                  data[i]["isChild"] = true;
                }
                if (data[x]["children"]) {
                  var children = data[x]["children"];
                  children.push(data[i]);
                  data[x]["children"] = children;
                  data[x]["isParent"] = true;
                } else {
                  var children = [];
                  children.push(data[i]);
                  data[x]["children"] = children;
                  data[x]["isParent"] = true;
                }
              }
            }
          }
          if (out === "Top") {
            if (!data[i]["group"]) {
              roots_counter++;
              data[i]["group"] = roots_counter;
              roots.push(data[i]);
            }
            if (!data[i]["depth"]) {
              data[i]["depth"] = 0;
            }
          }
        }
      } else {
        // if single output

        for (var x = 0; x < data.length; x++) {
          // loop through all table rows
          var name_x;
           if( name_x = data[x]["Name"]){
              var id_x = name_x.replace(" ", "-").toLowerCase();
            }else if(name_x = data[x]["name"]){
              var id_x = name_x.replace(" ", "-").toLowerCase();
            }
          data[x]["key"] = id_x.replace(" ", "-");

          var input_x = data[x]["Input"];
          if (!input_x) {
         } else if (input_x.includes(",")) {
            var inputs_x = input_x.split(",");
            for (var t = 0; t < inputs_x.length; t++) {
              var inp = inputs_x[t];

              if (data[x]["Name"] != name && inp === output) {
                if (data[x]["key"] && data[i]["key"]) {
                  links.push({
                    source: data[i]["key"],
                    target: data[x]["key"],
                    name: inp,
                    type: ""
                  });
                }

                if (data[i]["parents"]) {
                  var parents = data[i]["parents"];
                  //parents.push(data[x]);
                  data[i]["parents"] = parents;
                  data[i]["isChild"] = true;
                } else {
                  var parents = [];
                  //parents.push(data[x]);
                  //data[i]['parents'] = parents;
                  data[i]["isChild"] = true;
                }

                if (data[x]["children"]) {
                  var children = data[x]["children"];
                  children.push(data[i]);
                  data[x]["children"] = children;
                  data[x]["isParent"] = true;
                } else {
                  var children = [];
                  children.push(data[i]);
                  //console.log('children ',data[i],'added to ',data[x]);

                  data[x]["children"] = children;
                  data[x]["isParent"] = true;
                }
              }
            }
          } else {
            var outputs = output;
            if (data[x]["Name"] != name && input_x === output) {
              if (data[x]["key"] && data[i]["key"]) {
                links.push({
                  source: data[i]["key"],
                  target: data[x]["key"],
                  name: input_x,
                  type: ""
                });
              } else {
                console.log("key missing", data[x]["key"], data[i]["key"]);
              }

              if (data[i]["parents"]) {
                var parents = data[i]["parents"];
                //parents.push(data[x]);
                // data[i]['parents'] = parents;
                data[i]["isChild"] = true;
              } else {
                var parents = [];
                //parents.push(data[x]);
                //data[i]['parents'] = parents;
                data[i]["isChild"] = true;
              }
              if (data[x]["children"]) {
                var children = data[x]["children"];
                children.push(data[i]);
                //console.log('children ',data[i],'added to ',data[x]);
                data[x]["children"] = children;
                data[x]["isParent"] = true;
              } else {
                var children = [];
                children.push(data[i]);
                //console.log('children ',data[i],'added to ',data[x]);
                data[x]["children"] = children;
                data[x]["isParent"] = true;
              }
            }
          }
        }
        if (output === "Top") {
          if (!data[i]["group"]) {
            roots_counter++;
            data[i]["group"] = roots_counter;
            roots.push(data[i]);
          }
          if (!data[i]["depth"]) {
            data[i]["depth"] = 0;
          }
        }
      }
      if (!output) {
        if (!data[i]["group"]) {
          roots_counter++;
          data[i]["group"] = roots_counter;
          roots.push(data[i]);
        }
        if (!data[i]["depth"]) {
          data[i]["depth"] = 0;
        }
      }
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i]["isParent"] === true || data[i]["isChild"] === true) {
        //console.log('has children',data[i] );
        nodes.push({
          id: data[i]["key"],
          name: data[i]["Name"],
          label: data[i]["Bearbeitungsstatus"],
          group: "",
          data: data[i]
        });
      } else {
        // console.log('has no children',data[i] );
      }
    }
    var tree = {
      Name: "root",
      children: roots
    };
    this.setState({ links: links });
    this.setState({ nodes: nodes });
    this.setState({ hierarchical_data: data });
    this.setState({ tree: tree });
    this.setState({ tree_roots: roots });
  }