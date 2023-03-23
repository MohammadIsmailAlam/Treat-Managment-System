import React, { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
// import OrderedList from "../Menu/OrderedList";

export default function Landing() {
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setShow(true);
        setId(id);
    };

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    //Get
    useEffect(() => {
        //     https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json
        fetch("https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    //Delete
    const handleDelete = (id) => {
        fetch(`https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${id}.json`, {
            method: "DELETE",
        })
            .then(() => {
                const newData = { ...data };
                delete newData[id];
                setData(newData);
            });
    };

    function handleOnHome() {
        navigate("/Home");
    }

    const [isCopied, setIsCopied] = useState(null);

    const handleCopyClick = (id) => {
        navigator.clipboard.writeText(id);
        setIsCopied(id);

        setTimeout(() => {
            setIsCopied(null);
        }, 3000);
    };

    return (
        <>
            <div>
                {Object.entries(data).map(([key, value], index) => (
        <li
            key={index}
            style={{
                border: "1px solid grey",
                borderRadius: "12px",
                padding: "2em",
                margin: "2em",
                background: "aliceblue",
                position: "relative",
            }}
        >
            <button
                type="button"
                className="close"
                aria-label="Delete"
                variant="primary"
                onClick={() => handleShow(key)}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5em",
                    borderRadius: "10px",
                    border: "none",
                }}
            >
                <MdDeleteForever />
            </button>

            <button
                type="button"
                className="copy"
                aria-label="Copy"
                variant="primary"
                onClick={() => handleCopyClick(key)}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "1em",
                    borderRadius: "10px",
                    border: "none",
                    height:"0"
                }}
            >
                <BiCopy />
                {isCopied === key && (
                    <p className="success-message">
                        <TiTick />
                    </p>
                )}
            </button>

            {/* <div style={{display: "flex"}}>
                <span style={{fontWeight: "bold"}}>Created By:</span>
                <span style={{marginLeft: "0.5em"}}>{value.name}</span>
            </div> */}
            
            <div style={{display: "flex"}}>
                <span style={{fontWeight: "bold"}}>Budget:</span>
                <span style={{marginLeft: "0.5em"}}>{value.budgetLimitPerPerson}</span>
            </div>
            
            {/* <div style={{display: "flex"}}>
                <span style={{fontWeight: "bold"}}>Time:</span>
                <span style={{marginLeft: "0.5em"}}>{value.timeLimit}</span>
            </div> */}

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Orderd By</th>
                                </tr>
                            </thead>

                            <tbody>

                                {value.manualMenuList?.map((item, index) => {
                                    // console.log(item);
                                    return (
                                        <tr key={index}>
                                            <td>{item?.name}</td>
                                            <td>{item?.price}</td>
                                            <td>{item?.selectedBy?.map((person) => person.name).join(", ")}</td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </li>
                ))}
            </div>
        </>
    );
}