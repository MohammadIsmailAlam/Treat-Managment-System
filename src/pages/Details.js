import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "../App";

const Details = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const [fullScreen, setFullScreen] = useState(false);

  const context = useContext(userContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const key = searchParam.get("key");
  console.log(context, " => ", key);

  const handleBackButton = () => {
    navigator("/menu", { state: { ...location.state } });
  };

  const handleSubmit = (e) => {
    // POST
    // console.log(context.userEmail);
    const requestOptions = {
      method: key ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // "menuImage": location.state?.img,
        manualMenuList: location.state?.menuList,
        budgetLimitPerPerson: location.state?.budget,
        timeLimit: location.state?.time,
        selectedBy: [],
        userEmail: context.userEmail,
        caption: location.state?.caption
      }),
    };

    let url = "https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json"
    if (key) {
      url = `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${key}.json`;
    }
    //     https://treat-management-system-691e2-default-rtdb.firebaseio.com/
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(typeof data);
      });

    navigator("/DashBoard");
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <>
      <header>
        <button className="goBack" onClick={handleBackButton}>
          <FaArrowLeft />
        </button>
      </header>
      <div className="border details-container mt-3 mb-3 ">
        <h2>Details:</h2>

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

        {location.state?.isMenualMenuChecked && (
          <div className="table">
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
          </div>
        )}

        <p>Budget Limit: {location.state?.budget}</p>

        <p>Time Limit: {location.state?.time}</p>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Details;
