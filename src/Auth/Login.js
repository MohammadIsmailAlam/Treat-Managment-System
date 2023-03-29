import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../Config/FireBase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { userContext } from "../App";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const context = useContext(userContext);

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
          context.setUserEmail(email);
          localStorage.setItem("userEmail", email); // save email in local storage
          navigate("/DashBoard");
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

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
    .then((userCredential) => {
      context.setUserEmail(email);
      localStorage.setItem("userEmail", email);
    })
    .catch((error) => {
      console.log(error.code);
if (error.code === "auth/user-not-found") {
        setErr("Email not registered!");
      } else {
        setErr("");
      }
    });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/DashBoard");
    }
  });

  return (
    <div id="login">
      <div className="login">
        <h2 style={{ marginBottom: "3.5rem" }}>Login your account!</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
        <p>{err}</p>
        <button onClick={handleSubmit}>Login</button>
        <div className="footer" style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </div>
        <button style={{ marginTop: "1em" }} onClick={handleGoogleAuth}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
