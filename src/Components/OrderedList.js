import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";
import Header from "./Header";
// import OrderedList from "../Menu/OrderedList";

export default function Landing() {
  const [data, setData] = useState([]);

  //Get
  useEffect(() => {
    //     https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json
    fetch(
      "https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [isCopied, setIsCopied] = useState(null);

  const handleCopyClick = (id) => {
    const url = `${window.location.origin}/order/${id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(id);

    setTimeout(() => {
      setIsCopied(null);
    }, 3000);
  };

  return (
    <>
      <Header />
      {Object.entries(data).map(([key, value], index) => (
        <div className=" limitation row">
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
              {/* <div style={{display: "flex"}}>
                            <span style={{fontWeight: "bold"}}>Created By:</span>
                            <span style={{marginLeft: "0.5em"}}>{value.name}</span>
                        </div> */}
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    {/* <th>Orderd By</th> */}
                  </tr>
                </thead>

                <tbody>
                  {value.manualMenuList?.map((item, index) => {
                    // console.log(item);
                    return (
                      <tr key={index}>
                        <td>{item?.name}</td>
                        <td>{item?.price}</td>
                        {/* <td>
                                {item?.selectedBy
                                    ?.map((person) => person.name)
                                    .join(", ")}
                                </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
          </div>
          <div className="col-3">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                className="copy"
                aria-label="Copy"
                variant="primary"
                onClick={() => handleCopyClick(key)}
                style={{
                  borderRadius: "10px",
                  border: "none",
                  background: "none",
                }}
              >
                <IoReload  />
                {isCopied === key && (
                  <p className="success-message">
                    <TiTick />
                  </p>
                )}
              </button>

              <button
                type="button"
                className="copy"
                aria-label="Copy"
                variant="primary"
                onClick={() => handleCopyClick(key)}
                style={{
                  borderRadius: "10px",
                  border: "none",
                  background: "none",
                }}
              >
                <FaUserEdit />
                {isCopied === key && (
                  <p className="success-message">
                    <TiTick />
                  </p>
                )}
              </button>
            </div>

            <div className="limit form-control" style={{ display: "flex" }}>
              <span style={{ fontWeight: "bold" }}>Budget:</span>
              <span style={{ marginLeft: "0.5em" }}>
                {value.budgetLimitPerPerson}
              </span>
            </div>

            <div className=" limit form-control" style={{ display: "flex" }}>
              <span style={{ fontWeight: "bold" }}>Time:</span>
              <span style={{ marginLeft: "0.5em" }}>{value.timeLimit}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
