import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Results from "./components/Results";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Results />
    </div>
  );
}

export default App;
