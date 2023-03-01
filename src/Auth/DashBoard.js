import React, { useState, useEffect } from "react";
import firebase from "../Config/FireBase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  let handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    });
  };

  return (
    <div className="home" style={{ borderRadius: "10px", marginBottom: "20px" }}>
      <h2>Welcome, {user?.displayName}</h2>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default DashBoard;
