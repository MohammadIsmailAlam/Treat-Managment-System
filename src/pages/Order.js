import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuccessMsg from "../Components/SuccessMsg";

export default function Order() {
  const [values, setValues] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsError, setSelectedItemsError] = useState(false);

  const [isTimeUp, setIsTimeUp] = useState(false);


  const [showSucccess, setShowSuccess] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const { treatId } = useParams();

  const [rTime, setrTime] = useState("12:00");
  const [showTime, setShowTime] = useState("00:00");

  //   Get
  useEffect(() => {
    fetch(
      `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${treatId}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        console.log("need to eatch", data.timeLimit);
        setValues(data);
        setrTime(data.timeLimit);
        console.log("reminnimg time", rTime);
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

      console.log(
        "time",
        inputTime.toLocaleTimeString(),
        now.toLocaleTimeString()
      );
      const diffMs = inputTime - now;

      const diffHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
      const diffMinutes = Math.floor(
        (Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60)
      );
      const diffSecond = Math.floor(
        ((Math.abs(diffMs) % (1000 * 60 * 60)) % (1000 * 60)) / 1000
      );

      console.log("Se", ((diffMs % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
      console.log("Second", diffSecond);

      if (diffMs <= 0) {
        clearInterval(countdownInterval);
        setShowTime("Time's up!");
        console.log("time is showing", showTime);
        setIsTimeUp(true);
      } else {
        setShowTime(`${diffHours}:${diffMinutes}:${diffSecond}`);
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

    if (!name) {
      setNameError(true);
      hasError = true;
    }

    if (isTimeUp) {
      hasError(true)
    }

    if (selectedItems.length === 0) {
      setSelectedItemsError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedItemsData = values?.manualMenuList?.filter((item) =>
      selectedItems.includes(item.name)
    );

    if (selectedItemsData.length > 0) {
      console.log(
        `Selected items: ${selectedItemsData.map(
          (item) => `${item.name} ${item.price}`
        )}`
      );
    }

    console.log("the items are", selectedItems);

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
        console.log(data);
        setSelectedItems([]);
        setShowSuccess(true);
      });

    setShowSuccess(true);
    console.log(showSucccess);

    setSelectedItems([]);
    setName("");
    setNameError(false);
  };

  const isDisabled = isTimeUp;

  return (
    <div className="container">
      {showSucccess ? (
        <SuccessMsg />
      ) : (
        <div className="row">
          <div className="ordersSeelection">
            <header style={{ textAlign: "center", marginTop: "10px" }}>
              Order Form Here....
            </header>
            {values && (
              <div
                className="title"
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  backgroundColor: "lightblue",
                  fontSize: "24px",
                }}
              >
                <p style={{ fontFamily: "monospace" }}>
                  Budget: {values?.budgetLimitPerPerson}
                </p>
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              {isTimeUp ? (
                <p style={{ color: "red" }}>Time is up, this is not valid anymore.</p>
              ) : (
                <p>Time Limit: {showTime}</p>
              )}
            </div>

            <form
              className="order"
              style={{ display: "block" }}
              onSubmit={handleSubmit}
            >
              {values?.manualMenuList?.map((data, index) => (
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
                  <div className="checkboxes">
                    <label>
                      <input
                        type="checkbox"
                        value={data.name}
                        onChange={(e) => handleChecked(e, data.name)}
                      />
                      {data.name} ---- {data.price}
                    </label>
                  </div>
                </li>
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
                  margin: "2em",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <button type="submit" disabled={isDisabled}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
