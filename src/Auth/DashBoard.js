import React from "react";
import firebase from "../Config/FireBase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  let handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(auth.currentUser);
    } else {
      // User is signed out
      navigate("/SignUp");
    }
  });

  return (
    <div className="home">
      <button onClick={handleLogOut}>Log Out</button>
      {auth.currentUser ? (
        <>
          <h2>{auth.currentUser.displayName}</h2>
          <h2>{auth.currentUser.email}</h2>
          <h2>{auth.currentUser.uid}</h2>
        </>
      ) : (
        <p>{auth.currentUser.displayName}</p>
      )}
    </div>
  );
}  

export default DashBoard;