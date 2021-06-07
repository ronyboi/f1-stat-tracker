import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Results from "./components/Results";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/">
            <Schedule />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
