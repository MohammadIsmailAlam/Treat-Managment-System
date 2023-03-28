import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Button from "@mui/material/Button";

import Header from "./Header";
import { useNavigate } from "react-router-dom";
import BudgetAndTimeLimit from "./BudgetTimeLimit";

export default function OderedList() {
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  //Get
  useEffect(() => {
    fetch(
      "https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  
  const Navigate = useNavigate();

    const editItem = (value) => {
    // console.log("item ", value);
    Navigate("/menu", {
      state: {
        menuList: value.manualMenuList,
        budget: value.budgetLimitPerPerson,
        time: value.timeLimit,
        isMenualMenuChecked: true
      },
    });
  };

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  return (
    <>
      <Header />
      <strong style={{fontSize: "xx-large"}}> Use a template ! </strong>
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
              <h4> Treat Caption: {value.caption}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                  </tr>
                </thead>

                <tbody>
                  {value.manualMenuList
                    ?.slice(0, showMore ? undefined : 3)
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item?.name}</td>
                          <td>{item?.price}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {value.manualMenuList?.length > 3 && !showMore && (
                <Button onClick={handleShowMoreClick}>See More</Button>
              )}
            </li>
          </div>
          <div className="col-3">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div className="edit-treat">
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
