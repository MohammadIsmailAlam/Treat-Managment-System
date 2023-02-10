import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const [fullScreen, setFullScreen] = useState(false);

  const handleBackButton = () => {
    navigator("/Home", { state: { ...location.state } });
  };

  const handleSubmit = (e) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        "manualMenuList": location.state?.menuList,
        "budgetLimitPerPerson": location.state?.budget,
        "timeLimit": location.state?.time
      })
    };
    fetch("http://localhost:3001/treats", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))

      navigator("/")
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "12px",
        padding: "2em",
        margin: "2em",
        background: "aliceblue",
        position: "relative",
      }}
      className="details-container mt-3 mb-3 "
    >
      <header>
        <button className="goBack" onClick={handleBackButton}>
          <FaArrowLeft />
        </button>
      </header>

      <h2>Details:</h2>

      {
      !location.state?.img && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {location.state?.menuList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <img
        className={fullScreen ? "fullScreen" : ""}
        src={location.state?.img}
        alt=""
        onClick={toggleFullScreen}
        style={{
          cursor: "pointer",
          maxWidth: "100%",
          maxHeight: "100%",
          width: fullScreen ? "auto" : "250px",
          height: "auto",
          position: fullScreen ? "fixed" : "static",
          top: fullScreen ? 0 : "auto",
          left: fullScreen ? 0 : "auto",
          right: fullScreen ? 0 : "auto",
          bottom: fullScreen ? 0 : "auto",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: fullScreen ? 1000 : "auto",
          overflow: fullScreen ? "auto" : "hidden",
        }}
      />

      <p>Budget Limit: {location.state?.budget}</p>

      <p>Time Limit: {location.state?.time}</p>

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Details;
