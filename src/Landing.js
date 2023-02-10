import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {MdDeleteForever} from "react-icons/md";

export default function Landing() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    //Get
    useEffect(() => {
        fetch("http://localhost:3001/treats")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);

    //Delete
    const handleDelete = (id) => {
        fetch(`http://localhost:3001/treats/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                setData(data.filter(data => data._id !== id));
            });
    };


    function handleOnHome() {
        navigate("/Home");
    }

    return (
        <>
            <div className="plus">
                <button onClick={handleOnHome}> + </button>
            </div>

            <div>
                {data.map((data, index) => (
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
                        <button type="button" className="close" aria-label="Close" variant="primary" onClick={handleShow} style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            borderRadius: "10px",
                            border: "none"
                        }}>
                            <MdDeleteForever/>
                        </button>

                        <Modal show={show} onHide={handleClose}>

                            <Modal.Body>
                                Are You Sure You Want To Delete It..!!!
                            </Modal.Body>

                            <Modal.Footer>

                                <Button variant="primary" onClick={() => { handleDelete(data._id); handleClose(); }}>
                                    Ok
                                </Button>

                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>

                        </Modal>
                        Budget: {data.budgetLimitPerPerson} ----- Time:{data.timeLimit}
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.manualMenuList?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item?.name}</td>
                                            <td>{item?.price}</td>
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
