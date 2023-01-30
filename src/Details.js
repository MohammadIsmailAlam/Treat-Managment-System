import React from "react";

export default function Details({formData}) {

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