import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Details = () => {
    const [formData,setFormData] = useState()
    useEffect(()=>{
        const data = localStorage.getItem("formData");
        setFormData(JSON.parse(data))
    },[])
  return (
    <div className="details-container mt-3 mb-3">
    <h2>Details:</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {formData?.menuList?.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    <p>Budget Limit: {formData?.budget}</p>
    <p>Time Limit: {formData?.time}</p>

</div>
  )
}

export default Details