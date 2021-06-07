import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Results from "./components/Results";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Results /> */}
      <Schedule />
    </div>
  );
}

export default App;
