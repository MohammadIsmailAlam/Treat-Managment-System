import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FaUserEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import BudgetAndTimeLimit from "../Components/BudgetTimeLimit";
import Note from "../asset/Notify/Note";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import { handlePDFDownload } from "../asset/Buttons/pdf";

export default function ReOrder() {
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
    fetch("https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json")
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

  const handleClick = (key) => {
    handlePDFDownload(key, data);
  };

  return (
    <>
      <h1> Re-Order </h1>
      {!data ? (
        <div>No data is here.</div>
      ) : (
        <div style={{ display: "flex" }}>
          <div>Note: &nbsp;</div>
          <Note note="Click On The Copy Button and Share The Link" />
        </div>
      )}

      {Object.entries(data).map(([key, value], index) => (
        <div className="limitation row" key={key}>
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
            <div className="btn-style">
              <Tooltip
                sx={{ fontStyle: "normal" }}
                title="Copy"
                placement="top"
                arrow
                type="button"
                onClick={() => handleCopyClick(key)}
              >
                <IconButton>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              {isCopied === key && <TiTick />}

              <Tooltip
                title="Edit"
                placement="top"
                arrow
                onClick={() => editItem(value, key)}
              >
                <IconButton>
                  <FaUserEdit />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Delete"
                placement="top"
                arrow
                type="button"
                onClick={() => handleShow(key)}
              >
                <IconButton>
                  <DeleteOutline />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Download PDF"
                placement="top"
                arrow
                type="button"
                onClick={() => handleClick(key)}
              >
                <IconButton>
                  <PictureAsPdfSharpIcon />
                </IconButton>
              </Tooltip>
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
