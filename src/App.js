import React from "react";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Details from "./pages/Details";
import Landing from "./Landing";


function App() {

  
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/details" element={<Details/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
