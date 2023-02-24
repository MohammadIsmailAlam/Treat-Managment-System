import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../Config/FireBase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      setErr("Please fill in all fields!");
    } else if (!validateEmail(email)) {
      setErr("Invalid email address!");
    } else if (password.length < 8) {
      setErr("Password must be at least 8 characters long!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setErr("");
          navigate("/Home");
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            setErr("Wrong password!");
          } else if (error.code === "auth/user-not-found") {
            setErr("Email not registered!");
          } else {
            setErr("");
          }
        });
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/Home");
    }
  });

  return (
    <div id="login">
      <div className="login">
        <h2 style={{marginBottom:"3.5rem"}}>Login your account!</h2>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
        <p>{err}</p>
        <button onClick={handleSubmit}>Login</button>
        <div className="footer" style={{marginTop:"10px"}}>
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </div>
        
      </div>
    </div>
  );
};

export default Login;