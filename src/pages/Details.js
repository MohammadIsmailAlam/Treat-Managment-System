import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const Details = () => {
    const location = useLocation();
    const navigator = useNavigate();

    const handleBackButton = () => {
       
       navigator('/', {state:location.state});
       console.log(location.state)
    }

  return (
    <div className="details-container mt-3 mb-3">
        <header>
            <button className='goBack' onClick={handleBackButton}>
            <FaArrowLeft/>
            </button>
        </header>
    <h2>Details:</h2>
    
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
    <p>Budget Limit: {location.state?.budget}</p>
    <p>Time Limit: {location.state?.time}</p>

</div>
  )
}

export default Details
