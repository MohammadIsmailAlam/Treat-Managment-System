import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Home from "./pages/Menu";
import "bootstrap/dist/css/bootstrap.css";
import "../src/Styles/App.css";

import Details from "./pages/Details";
import Order from "./pages/Order";
import Template from "./Components/Template";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Auth/DashBoard";
import ReOrder from "./pages/ReOrder";
import Header from "./Components/Header";

export const userContext = React.createContext(null);

function App() {
  const [userEmail, setUserEmail] = useState("");

  function HeaderWithCondition() {
    const location = useLocation();
    if (location.pathname === '/' || location.pathname === '/signup') {
      return null; // don't render Header component
    }
    return <Header />;
  }
  
  return (
    <>
      <userContext.Provider value={{ userEmail, setUserEmail }}>
        <Router>
          <HeaderWithCondition />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/re-order" element={<ReOrder />} />
            <Route exact path="/menu/:key" element={<Home />} />
            <Route exact path="/menu" element={<Home />} />
            <Route exact path="/details" element={<Details />} />
            <Route exact path="/order/:treatId" element={<Order />} />
            <Route exact path="/template" element={<Template />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </>
  );
}

export default App;
