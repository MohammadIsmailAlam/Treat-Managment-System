import React, { useEffect, useState } from 'react'

export default function Order() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/treats")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="">
                    <div className="title" style={{ textAlign:"center", marginTop: "10px"}}>
                        Order Form Here....
                    </div>
                    <form className='order'>
                        {data.slice(0, 1).map((_data, index) => (
                            <li
                                key={index}
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "12px",
                                    padding: "2em",
                                    margin: "2em",
                                    background: "aliceblue",
                                    position: "relative"
                                }}
                            />
                        ))}

                        <div className='input' style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "2em",
                            margin: "2em"
                        }}>

                            <input type="text" className='menuName' placeholder=' Enter Name ' style={{ border: "1px solid grey" }} />
                            <input type="number" className='quantity' placeholder=' Quantity ' style={{ border: "1px solid grey" }} />
                            <button type="submit" style={{
                                border: "1px solid grey",
                                borderRadius: "12px",
                                background: "aliceblue",
                                marginLeft: "10px",
                                position: "relative"
                            }}>
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
