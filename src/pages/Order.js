import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import SuccessMsg from "../Components/SuccessMsg";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

export default function Order() {
  const [values, setValues] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsError, setSelectedItemsError] = useState(false);
  const [showSucccess, setShowSuccess] = useState(false);

  const [name, setName] = useState("");
  const [budgetError, setBudgetError] = useState(false);
  const { treatId } = useParams();
  const [quantities, setQuantities] = useState({});

  const [rTime, setrTime] = useState("12:00");
  const [showTime, setShowTime] = useState("00:00");
  const [isTimeUp, setIsTimeUp] = useState(false);

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
        setrTime(data.timeLimit);
        // console.log("reminnimg time", rTime);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [treatId]);

  useEffect(() => {
    // Get the current date as a Date object
    const today = new Date();

    // Create a new Date object with the input time set for today's date
    const inputTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    inputTime.setHours(parseInt(rTime.split(":")[0], 10));
    inputTime.setMinutes(parseInt(rTime.split(":")[1], 10));

    const countdownInterval = setInterval(() => {
      const now = new Date();

      // console.log(
      //   "time",
      //   inputTime.toLocaleTimeString(),
      //   now.toLocaleTimeString()
      // );
      const diffMs = inputTime - now;

      const diffHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
      const diffMinutes = Math.floor(
        (Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60)
      );
      const diffSecond = Math.floor(
        ((Math.abs(diffMs) % (1000 * 60 * 60)) % (1000 * 60)) / 1000
      );

      // console.log("Se", ((diffMs % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
      // console.log("Second", diffSecond);

      if (diffMs <= 0) {
        clearInterval(countdownInterval);
        setShowTime("Time's up!");
        // console.log("time is showing", showTime);
        setIsTimeUp(true);
      } else {
        setShowTime(
          `${diffHours.toString().padStart(2, "0")}:${diffMinutes
            .toString()
            .padStart(2, "0")}:${diffSecond.toString().padStart(2, "0")}`
        );
        // setShowTime(diffSecond.toString());
      }
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [rTime]);

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

    if (isTimeUp) {
      hasError = true;
    }

    if (selectedItems.length === 0) {
      setSelectedItemsError(true);
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
                              <button
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
                              
                              <button
                                onClick={() =>
                                  setQuantities({
                                    ...quantities,
                                    [item.id]: quantity - 1,
                                  })
                                }
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
            {selectedItemsError && (
              <div
                className="error"
                style={{ color: "red", marginTop: "10px" }}
              >
                {" "}
                Please select at least one item
              </div>
            )}
            <div
              className="input"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2em",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <button type="submit" disabled={isDisabled}>
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
              <div style={{ textAlign: "center" }}>
                {isTimeUp ? (
                  <p style={{ color: "red" }}>
                    Time is up, this is not valid anymore.
                  </p>
                ) : (
                  <p>Time Limit: {showTime}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
