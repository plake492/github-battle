import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./compoments/Popular";
import Battle from "./compoments/Battle";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Battle />
        {/* <Popular /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
