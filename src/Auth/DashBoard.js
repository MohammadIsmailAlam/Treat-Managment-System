import React, { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import panBook from "../asset/img/Rectangle 10.png";
import dairy from "../asset/img/Rectangle 13.png";
import clock from "../asset/img/Rectangle 16.png";
import Status from "../asset/Notify/Status";
import { Button } from "@mui/material";

const DashBoard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
      <Status />
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
          <Button className="btn btn-primary" onClick={() => navigate("/menu")}>
            Let's Go
          </Button>
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
          <Button
            className="btn btn-primary"
            onClick={() => navigate("/template")}
          >
            Let's Go
          </Button>
        </div>

        <div className="card">
          <img src={clock} className="card-img-top" alt="clock" />
          <div
            className="card-title"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            {/* Re-order ! */}
            Order History
          </div>
          <p className="card-text" style={{ marginTop: "0.5em" }}>
            Simply reuse your old and favorite list :D
          </p>
          <Button
            className="btn btn-primary"
            onClick={() => navigate("/re-order")}
          >
            Let's Go
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
