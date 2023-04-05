import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import SuccessMsg from "../Components/SuccessMsg";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Order() {
  const [values, setValues] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSucccess, setShowSuccess] = useState(false);

  const [name, setName] = useState("");
  const [budgetError, setBudgetError] = useState(false);
  const { treatId } = useParams();
  const [quantities, setQuantities] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (isTimeUp) {
      hasError = true;
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
        setShowSuccess(true);
      });

    setShowSuccess(true);
    // console.log(showSucccess);

    setSelectedItems([]);
    setName("");
  };

  const isDisabled = isTimeUp;

  return (
    <div className="container">
      {showSucccess ? (
        <SuccessMsg
          showSucccess={showSucccess}
          setShowSuccess={setShowSuccess}
        />
      ) : (
        <div className="ordersSeelection row">
          <Header />
          <form className="order col-6" onSubmit={handleSubmit}>
            {values?.manualMenuList?.map((data, index) => (
              <div className="limits">
                <li
                  key={index}
                  style={{
                    padding: "2em",
                    margin: "2em",
                    background: "#FFFFFF",
                    position: "relative",
                  }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      {values.manualMenuList?.map((item, index) => {
                        const quantity = quantities[item.id] || 0;
                        return (
                          <tr key={index}>
                            <td>{item?.name}</td>
                            <td>{item?.price}</td>
                            <td>
                              <button className="incress"
                                type="button"
                                onClick={() =>
                                  setQuantities({
                                    ...quantities,
                                    [item.id]: quantity + 1,
                                  })
                                }
                              >
                                <AddCircleOutlineOutlinedIcon />
                              </button>

                              <span>{quantity}</span>

                              <button className="decress"
                                type="button"
                                onClick={() => {
                                  if (quantity > 0) {
                                    setQuantities({
                                      ...quantities,
                                      [item.id]: quantity - 1,
                                    });
                                  }
                                }}
                              >
                                <RemoveCircleOutlineOutlinedIcon />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </li>
              </div>
            ))}

            <div
              className="input"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2em",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <button className="submit" type="submit" disabled={isDisabled}>
                  Submit
                </button>
              </div>
            </div>
          </form>

          {values && (
            <div
              className="limits col-6"
              style={{ textAlign: "center", marginTop: "2em" }}
            >
              <p style={{ fontFamily: "monospace" }}>
                Budget: {values?.budgetLimitPerPerson}
              </p>

              {budgetError && (
                <div
                  className="error"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  Budget Limit Crossed
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
                  <CircularProgressbar className="progressBar" 
                    value={timeInfo.percentageRemaining}
                    maxValue={100}
                    text={`${timeInfo.hours}:${timeInfo.minutes}:${timeInfo.seconds}`}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
