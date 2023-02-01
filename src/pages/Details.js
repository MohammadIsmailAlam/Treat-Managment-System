import React from 'react'
import { useLocation } from 'react-router-dom';

const Details = () => {
    const location = useLocation();
    console.log(location)

  return (
    <div className="details-container mt-3 mb-3">
        <header>
            
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