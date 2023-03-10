import React, { useState, useEffect } from "react";
import firebase from "../Config/FireBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Header from "../Components/Header";

const DashBoard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        navigate("/");
      }
    },[user]);

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  return (
    <>
      <Header />
      <div className="home" style={{ borderRadius: "10px", marginBottom: "20px" }}>
        <h2>Welcome, {user?.displayName}</h2>
        {user && <Landing />}
      </div>
    </>
  );
};

export default DashBoard;
