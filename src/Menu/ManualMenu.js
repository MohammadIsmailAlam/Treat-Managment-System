import React from "react";
import { useState } from "react";

export default function ManualMenu({ setnamePriceList, namePriceList, setIsMenualMenuSelected }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isShow, setIsShow] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleShow = (e) => {
    setIsShow(e.target.checked)
    setIsMenualMenuSelected(e.target.checked)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameError(true)
    }

    if (price.length === 0) {
      setPriceError(true)
    }
    if (name.length > 0 && price.length > 0) {
      setnamePriceList(prev => {
        return [...prev, {
          name, price
        }]
      })
      setName("")
      setPrice("")
    }
  };

  return (
    <div className="menu-selection">
      <ul>
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            className="manualMenuInput"
            value="manualMenu"
            id="manualMenu"
            onChange={handleShow}

          />
          <label class="checkbox" for="manualMenu" >
            Manual Menu
          </label>
        </li>

        {
          isShow && (
            <>
              <div className="manualMenu">
                <form onSubmit={handleSubmit} id="myForm">
                  <div className="input-group">
                    <label htmlFor="name">Name </label>
                    <input type="text" id="name" value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        setNameError(false)
                      }} />

                    {
                      nameError &&
                      <div className="error" style={{ color: 'red', marginTop: '10px' }}> Name Can't Be Empty</div>

                    }

                  </div>
                  <div className="input-group">
                    <label htmlFor="price">Item Price</label>
                    <input type="number" id="price" value={price} min onChange={(e) => {
                      setPrice(e.target.value)
                      setPriceError(false)
                    }} />
                    {priceError &&
                      <div className="error" style={{ color: 'red', marginTop: '10px' }}> Price Can't Be Empty</div>
                    }
                  </div>
                  <button type="submit" className="add-btn">
                    + Add
                  </button>
                </form>
              </div>

            </>
          )}

        <ol>
         {namePriceList.map((item, index) => {
            return (
              <li>
                {item.name} --- {item.price}
                <button style={{borderRadius: "15px", marginLeft:"10px"}} onClick={() => {
                  setnamePriceList(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                  });
                }}>
                  x
                </button>
              </li>
            );
          })}
        </ol>
      </ul>
    </div>
  );
}
