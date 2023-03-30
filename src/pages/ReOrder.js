import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiCopy } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import {  useLocation, useNavigate } from "react-router-dom";
import BudgetAndTimeLimit from "../Components/BudgetTimeLimit";
import Note from "../Components/Note";

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
  const location = useLocation();

  //Get
  useEffect(() => {
    fetch(
      "https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.entries(data)
          .filter(
            ([key, treat]) =>
              treat.userEmail === localStorage.getItem("userEmail")
          )
          .map(([key, treat]) => [key, treat]);
        setData(Object.fromEntries(filteredData));
      });
  }, []);

  //Delete
  const handleDelete = (id) => {
    fetch(
      `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(() => {
      const newData = { ...data };
      delete newData[id];
      console.log(newData);
      setData(newData);
    });
  };

  const [isCopied, setIsCopied] = useState(null);

  const handleCopyClick = (id) => {
    const url = `${window.location.origin}/order/${id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(id);

    setTimeout(() => {
      setIsCopied(null);
    }, 3000);
  };

  const editItem = (value) => {
    console.log(value);
    console.log(location);
    navigate("/menu", {
      state: value,
    });
  };

  return (
    <>
      <h1> Re-Order </h1>
      <Note />
      {Object.entries(data).map(([key, value], index) => (
        <div className="limitation row">
          <div className="col-8">
            <li
              key={index}
              style={{
                padding: "2em",
                margin: "2em",
                background: "#FFFFFF",
                position: "relative",
              }}
            >
              <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are You Sure You Want To Delete It..!!!</Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleDelete(id);
                      handleClose();
                    }}
                  >
                    Ok
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <h4> Treat Caption: {value.caption}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Orderd By</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {value.manualMenuList?.map((item, index) => {
                    const selectedCount = item.selectedBy?.length || 0;
                    return (
                      <tr key={index}>
                        {item?.caption}
                        <td>{item?.name}</td>
                        <td>{item?.price}</td>
                        <td>
                          {item?.selectedBy
                            ?.map((person) => person.name)
                            .join(", ")}
                        </td>
                        <td>{selectedCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
          </div>

          <div className="col-3">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  type="button"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    background: "none",
                  }}
                  onClick={() => handleCopyClick(key)}
                >
                  <BiCopy />
                </button>
                {isCopied === key && <TiTick />}

                <button
                  type="button"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    background: "none",
                  }}
                  onClick={() => editItem(value, key)}
                >
                  <FaUserEdit />
                </button>

                <button
                  type="button"
                  onClick={() => handleShow(key)}
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    background: "none",
                  }}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
            <BudgetAndTimeLimit
              budgetLimitPerPerson={value.budgetLimitPerPerson}
              timeLimit={value.timeLimit}
            />
          </div>
        </div>
      ))}
    </>
  );
}