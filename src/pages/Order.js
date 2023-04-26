import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import SuccessMsg from "../Components/SuccessMsg";
// import QuantityField from "../common/QuantityField";

export default function Order() {
  const [values, setValues] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const { treatId } = useParams();
  const [selectedItemsError, setSelectedItemsError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timeInfo, setTimeInfo] = useState(null);
  //   Get
  useEffect(() => {
    fetch(
      `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${treatId}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data);
        console.log("need to eatch", data.timeLimit);
        setValues(data);
        // console.log("reminnimg time", rTime);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [treatId]);

  function getTimeDifference(createdAt, expiry) {
    let now = new Date().getTime();

    // Calculate the time difference in milliseconds
    let timeDiff = expiry - now;

    // Calculate the time difference in hours, minutes, and seconds
    let hours = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Calculate the percentage of time remaining until the expiry timestamp
    let percentageRemaining = (timeDiff / (expiry - createdAt)) * 100;

    return {
      hours,
      minutes,
      seconds,
      percentageRemaining,
      isExpired: now > expiry,
    };
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (values?.timeLimit) {
        let newInfo = getTimeDifference(values?.createdAt, values?.timeLimit);
        if (newInfo.isExpired) {
          setIsTimeUp(true);
        } else {
          setTimeInfo(newInfo);
        }
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [values]);

  const handleChecked = (e, itemName) => {
    const checked = e.target.checked;

    setSelectedItemsError(false);

    setSelectedItems((prevSelectedItems) => {
      if (checked) {
        return [...prevSelectedItems, itemName];
      } else {
        return prevSelectedItems.filter((item) => item !== itemName);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!name) {
      setNameError(true);
      hasError = true;
    }

    if (isTimeUp) {
      hasError = true;
    }

    if (selectedItems.length === 0) {
      setSelectedItemsError(true);
      hasError = true;
      return;
    }

    // Calculate total cost of selected items
    const selectedItemsData = values?.manualMenuList?.filter((item) =>
      selectedItems.includes(item.name)
    );

    const totalCost = selectedItemsData
      .reduce((acc, item) => {
        const price = parseInt(item.price);
        if (!isNaN(price)) {
          return acc + price;
        } else {
          return acc;
        }
      }, 0)
      .toFixed(2);

    // Check if total cost exceeds budget limit
    if (parseInt(totalCost) > values.budgetLimitPerPerson) {
      setBudgetError(true);
      // console.log("JHVKHASJVGSDVH" , totalCost);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Patch/Update
    fetch(
      `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${treatId}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manualMenuList: [
            ...values?.manualMenuList?.map((item) => {
              if (selectedItems.includes(item.name)) {
                if (!item.selectedBy) {
                  item.selectedBy = [];
                }
                item.selectedBy.push({ name });
              }
              return item;
            }),
          ],
          budgetLimitPerPerson: values.budgetLimitPerPerson,
          timeLimit: values.timeLimit,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSelectedItems([]);
        setOpen(true);
      });

    setOpen(true);
    console.log(open);

    setSelectedItems([]);
    setName("");
    setNameError(false);
  };

  const isDisabled = isTimeUp;

  return (
    <div className="container">
      {open ? (
        <SuccessMsg open={open} />
      ) : (
        <div className="row">
          <Header />
          {values && (
            <form className="col-6" onSubmit={handleSubmit}>
              <h4 style={{marginTop: "20px"}}> Treat Caption: {values.caption}</h4>
              <TableContainer>
                <Table className="menu-table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      {/* <TableCell>Quantity</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values?.manualMenuList?.map((item, index) => (
                      <TableRow key={item.name}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.name)}
                            onChange={(e) => handleChecked(e, item.name)}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        {/* <TableCell>
                          <QuantityField props />
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {selectedItemsError && (
                <div style={{ color: "red", marginTop: "10px" }} className="error">Please select at least one item.</div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  style={{ marginRight: "10px" }}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                />

                {nameError && (
                  <div
                    className="error"
                    style={{ color: "red", marginTop: "10px" }}
                  >
                    {" "}
                    Name Can't Be Empty
                  </div>
                )}
              </div>

              <div
                className="input"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2em",
                }}
              >
                <div className="submit-container">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isDisabled}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          )}

          <div className="col-6">
            {values && (
              <div
                className="limits col-6"
                style={{ textAlign: "center", marginTop: "2em" }}
              >
                <p style={{ fontFamily: "monospace" }}>
                  Budget: {values?.budgetLimitPerPerson}
                </p>
                {budgetError && (
                  <div className="error">
                    Total cost of selected items exceeds budget limit.
                  </div>
                )}
                {isTimeUp && (
                  <div
                    className="error"
                    style={{ color: "red", marginTop: "10px" }}
                  >
                    Time is up
                  </div>
                )}
                <div className="timeLimit">
                  {timeInfo && (
                    <CircularProgressbar
                      className="progressBar"
                      value={timeInfo.percentageRemaining}
                      maxValue={100}
                      text={`${timeInfo.hours}:${timeInfo.minutes}:${timeInfo.seconds}`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
