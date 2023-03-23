import React, { useEffect } from "react";
import "../Styles/table.css";
import { useState } from "react";
import addBtn from "../asset/img/Ellipse 1.png";

export default function ManualMenu({
  setnamePriceList,
  namePriceList,
  setIsMenualMenuSelected,
  isMenualMenuSelected,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isShow, setIsShow] = useState(true);

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    if (isMenualMenuSelected) {
      setIsShow(true);
    }
  }, [isMenualMenuSelected]);

  const handleShow = (e) => {
    setIsShow(e.target.checked);
    setIsMenualMenuSelected(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameError(true);
    }

    if (price.length === 0) {
      setPriceError(true);
    }

    if (name.length > 0 && price.length > 0) {
      // Update state with new item
      const newItem = { name, price };
      const updatedList = [...namePriceList, newItem];
      setnamePriceList(updatedList);

      // Reset input fields
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="menu-selection">
      <ul>
        {/* <li>
          <input
            name="menuTypeList"
            type="checkbox"
            className="manualMenuInput"
            value="manualMenu"
            id="manualMenu"
            onChange={handleShow}
            checked={isShow}
          />
          <label className="checkbox" htmlFor="manualMenu">
            Manual Menu
          </label>
        </li> */}

        {isShow && (
          <>
            <div className="manualMenu">
              <div className="row"></div>
              <form onSubmit={handleSubmit} id="myForm">
                <div className="contant">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      style={{ marginRight: "10px" }}
                      placeholder="Item Name"
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
                        Name Can't Be Empty
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      value={price}
                      placeholder="Item Price"
                      style={{ marginLeft: "10px" }}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        setPriceError(false);
                      }}
                    />
                    {priceError && (
                      <div
                        className="error"
                        style={{ color: "red", marginTop: "10px" }}
                      >
                        Price Can't Be Empty
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary add">
                    <img src={addBtn} alt="addBtn" />
                  </button>
                </div>

                <div className="details">
                  <table>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Item Pric</th>
                        <th></th>
                      </tr>
          
                    </thead>
                    <tbody>
                      {namePriceList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                              <button
                                onClick={() =>
                                  setnamePriceList((prev) => {
                                    const newList = prev.slice();
                                    newList.splice(index, 1);
                                    return newList;
                                  })
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
