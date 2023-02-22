import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Order() {
  const [values, setValues] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [remainingTime, setRemainingTime] = useState(0);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  // const location = useLocation();
  const { treatId } = useParams();

  //   Get
  useEffect(() => {
    fetch(
      `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${treatId}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setValues(data);
        // setRemainingTime(data?.timeLimit * 60 * 1000);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [treatId]);

  // //   time handle
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
  //     }, 1000);

  //     return () => clearInterval(intervalId);
  //   }, []);

  //   const formatTime = (time) => {
  //     const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  //     const minutes = Math.floor(time / 60000);
  //     const seconds = Math.floor((time % 60000) / 1000);

  //     return `${hours}:${minutes
  //       .toString()
  //       .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  //   };

  const handleChecked = (e) => {
    const name = e.target.value;

    setSelectedItems((prevSelectedItems) => {
      if (e.target.checked) {
        return [...prevSelectedItems, name];
      } else {
        return prevSelectedItems.filter((item) => item !== name);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError(true);
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

    // post
    fetch(
      "https://treat-management-system-691e2-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          itemsName: selectedItems,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data posted:", data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <div className="container">
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
            <p>Time Limit: {values?.timeLimit}</p>
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
                      name="selectedItems"
                      value={data.name}
                      onChange={handleChecked}
                    />
                    {data.name} ---- {data.price}
                  </label>
                </div>
              </li>
            ))}
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
              <button
                type="submit"
                style={{
                  border: "1px solid grey",
                  borderRadius: "12px",
                  background: "aliceblue",
                  marginLeft: "10px",
                  position: "relative",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
