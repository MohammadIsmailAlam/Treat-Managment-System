import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
export default function Landing() {

    const [show, setShow] = useState(false);
    const [id, setId] = useState()

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
    // const handleDelete = (id) => {
    //     fetch(
    //         `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${id}.json`, {

    //         method: "DELETE",
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then(() => {
    //             setData(Object.values(data).filter((dataItem) => dataItem.id !== id));
    //         });
    // };

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

    return (
        <>
            <div className="plus">
                <button onClick={handleOnHome}> + </button>
            </div>

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
                        <button type="button" className="close" aria-label="Close" variant="primary" onClick={() => handleShow(key)}
                            style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                borderRadius: "10px",
                                border: "none",
                            }}
                        >
                            <MdDeleteForever />

                        </button>

                        <Modal show={show} onHide={handleClose}>

                            <Modal.Body>Are You Sure You Want To Delete It..!!!</Modal.Body>

                            <Modal.Footer>
                                <Button variant="primary" onClick={() => { handleDelete(id); handleClose(); }}>
                                    Ok
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>

                        </Modal>

                        Budget: {value.budgetLimitPerPerson} ----- Time:{value.timeLimit}

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>

                                {value.manualMenuList?.map((item, index) => {
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
