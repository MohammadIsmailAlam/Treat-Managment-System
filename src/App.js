import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Menu";
import "bootstrap/dist/css/bootstrap.css";
import "../src/Styles/App.css";

import Details from "./pages/Details";
// import Landing from "./pages/Landing";
import Order from "./pages/Order";
import OrderedList from "./Components/OrderedList";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Auth/DashBoard";

import Landing from "./pages/Landing";

export const userContext = React.createContext(null);

function App() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      <userContext.Provider value={{ userEmail, setUserEmail }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/landing" element={<Landing />} />
            <Route exact path="/menu/:key" element={<Home />} />
            <Route exact path="/menu" element={<Home />} />
            <Route exact path="/details" element={<Details />} />
            {/* <Route exact path="/order" element= {<Order/>}/> */}
            <Route exact path="/order/:treatId" element={<Order />} />
            <Route exact path="/orderedList" element={<OrderedList />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </>
  );
}

export default App;
