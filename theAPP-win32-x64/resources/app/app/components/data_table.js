import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React, { Component } from "react";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", data: undefined };
  }
  componentWillMount() {
    console.log("Table will mount");
  }
  componentDidMount() {
    console.log("Table did mount");

    this.setState({ data: this.props.data });
  }
  render() {
    var data = this.props.data;
    if (data) {
      return (
        <BootstrapTable data={data} striped={true} hover={true}>
          <TableHeaderColumn
            dataField="Name"
            isKey={true}
            dataAlign="center"
            dataSort={true}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Input" dataSort={true}>
            Vater
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Output" dataSort={true}>
            Besitzer
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Standardkonformität" dataSort={true}>
            Standardkonform
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Bearbeitungsstatus" dataSort={true}>
            Bearbeitungsstatus
          </TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
}
export default DataTable;
