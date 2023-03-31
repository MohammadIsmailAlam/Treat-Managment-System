import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import BudgetAndTimeLimit from "./BudgetTimeLimit";

export default function OderedList() {
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchCaption, setSearchCaption] = useState("");
  const [sortBy, setSortBy] = useState("");
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
              treat.template
          )
          .map(([key, treat]) => [key, treat]);
        setData(Object.fromEntries(filteredData));
      });
  }, []);
  

  const Navigate = useNavigate();

  const editItem = (value) => {
    console.log(value);
    console.log(location);
    Navigate("/menu", {
      state: value,
    });
  };

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const handleCaptionSearch = (event) => {
    setSearchCaption(event.target.value);
  };

  const filteredData = Object.entries(data)
  .filter(
    ([key, value]) =>
      value.caption &&
      value.caption.toLowerCase().includes(searchCaption.toLowerCase()) &&
      (sortBy === "" || sortBy === value.type)
  )
  .sort((a, b) => a[1].budgetLimitPerPerson - b[1].budgetLimitPerPerson);


  return (
    <>
      <h1> Use a Template ! </h1>
      <div className="search" style={{ display: "flex", gap: "1em" }}>
        <div className="caption">
          <input
            type="text"
            placeholder="Search by caption"
            value={searchCaption}
            onChange={handleCaptionSearch}
            className="form-control"
          />
        </div>
      </div>
      {filteredData.map(([key, value], index) => (
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
