import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuccessMsg from "../Components/SuccessMsg";

export default function Order() {
  const [values, setValues] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [showSucccess, setShowSuccess] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
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
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [treatId]);

  const handleChecked = (e, itemName) => {
    const checked = e.target.checked;

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
      });

    setShowSuccess(true);
    console.log(showSucccess);

    setSelectedItems([]);
    setName("");
    setNameError(false);
  };

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
                        value={data.name}
                        onChange={(e) => handleChecked(e, data.name)}
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
      )}
    </div>
  );
}
