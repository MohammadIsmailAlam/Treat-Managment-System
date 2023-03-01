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
      navigate("/");
    }
  });

  return (
    <div className="home" style={{borderRadius:"10px", marginBottom:"20px"}}>
      {auth.currentUser ? (
        <>
          <h2>{auth.currentUser.displayName}</h2>
          <h2>{auth.currentUser.email}</h2>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleLogOut}>Log Out</button>
      
    </div>
  );
}  

export default DashBoard;