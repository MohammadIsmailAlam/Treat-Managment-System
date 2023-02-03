import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const Details = () => {
    const location = useLocation();
    const navigator = useNavigate();
    const [fullScreen, setFullScreen] = useState(false);

    const handleBackButton = () => {
        navigator('/', {state: location.state});
    }

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
    }

  return (
    <div className="details-container mt-3 mb-3">
        <header>
            <button className='goBack' onClick={handleBackButton}>
                <FaArrowLeft />
            </button>
        </header>
        <h2>Details:</h2>
        {
            !location.state?.img && 
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
        }
        <img className={fullScreen && "fullScreen"}
            src={location.state?.img}
            alt=""
            onClick={toggleFullScreen}
            style={{
                cursor: "pointer",
                // maxWidth: fullScreen?  "100vw !important" : "250px",
                width: fullScreen ? "100vh" : "auto",
                height: fullScreen ? "100vw" : "auto",
                position: fullScreen ? "fixed" : "static",
                top: fullScreen ? 0 : "auto",
                left: fullScreen ? 0 : "auto",
                right: fullScreen ? 0 : "auto",
                bottom: fullScreen ? 0 : "auto",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: fullScreen ? 1000 : "auto",
            }}
        />
        <p>Budget Limit: {location.state?.budget}</p>
        <p>Time Limit: {location.state?.time}</p>
    </div>
  )
}

export default Details
