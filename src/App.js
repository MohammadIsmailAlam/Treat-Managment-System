import React from "react";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Details from "./pages/Details";
import Landing from "./pages/Landing";
import Order from "./pages/Order";
import OrderedList from "./Menu/OrderedList";


function App() {

  
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/details" element={<Details/>}/>
        <Route exact path="/order" element= {<Order/>}/>
        <Route exact path="/order/:treatId" element= {<Order/>}/>
        <Route exact path="/orderedList" element= {<OrderedList/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
