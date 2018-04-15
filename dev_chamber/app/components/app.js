import React from "react";

function Contacts() {
  return (
    <div className="Contacts">
      <h1>Hello World</h1>
    </div>
  );
}

function Chat() {
  return <div className="Chat" />;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}


//import { ipcRenderer } from "electron";

export default class App extends React.Component {
  render() {
    return (
      <div id="app" style={{ textAlign: "center" }}>
        {this.props.children}
        <SplitPane left={<Contacts />} right={<Chat />}> </SplitPane>
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById("root"));
