import React, { useState, useEffect, useContext } from "react";
import firebase from "../Config/FireBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Header from "../Components/Header";
import { userContext } from "../App";
import "../Styles/Design.css";
import panBook from "../asset/img/Rectangle 10.png";
import dairy from "../asset/img/Rectangle 13.png";
import clock from "../asset/img/Rectangle 16.png";

const DashBoard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  const context = useContext(userContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const email = localStorage.getItem("userEmail");
        context.setUserEmail(email);
      } else {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  return (
    <>
      <Header />
      <div className="card-group">
        <div className="card">
          <img src={panBook} className="card-img-top" alt="panBook" />
          <div
            className="card-title"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Create your own list
          </div>
          <p className="card-text" style={{ marginTop: "0.5em" }}>
            Add list of items (dont forget to mention prices) and also the
            budget per person and set a time limit !
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/menu")}
          >
            Let's Go
          </button>
        </div>

        <div className="card">
          <img src={dairy} className="card-img-top" alt="dairy" />
          <div
            className="card-title"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Use a template !
          </div>
          <p className="card-text" style={{ marginTop: "0.5em" }}>
            Save your ordering time by using a template and make use of popular
            ready made template !
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/Order")}
          >
            Let's Go
          </button>
        </div>

        <div className="card">
          <img src={clock} className="card-img-top" alt="clock" />
          <div
            className="card-title"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Re-order !
          </div>
          <p className="card-text" style={{ marginTop: "0.5em" }}>
            Simply reuse your old and favorite list :D
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/Order")}
            // style={{marginTop: "10px"}}
          >
            Let's Go
          </button>
        </div>
      </div>

      {/* <div className="home" style={{ borderRadius: "10px", margin: "1em" }}>
        <h2>Welcome, {user?.displayName}</h2>
        {user && <Landing data={data} />}
      </div> */}
    </>
  );
};

export default DashBoard;
