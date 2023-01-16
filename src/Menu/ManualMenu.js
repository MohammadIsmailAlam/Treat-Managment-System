import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ManualMenu() {

  const [isShow, setIsShow] = useState(false);
  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

  return (
    <div className="menu-selection">
      <ul>
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            class="manualMenuInput"
            value="manualMenu"
            onChange={handleShow}
            
          />
          <label class="checkbox" for="manualMenu" onClick = {handleClose}>
            Manual Menu
          </label>
        </li>

        {isShow && (
          <>
            <div className="manualMenu">
              <form>
                <div className="input-group">
                  <label htmlFor="name">Name </label>
                  <input type="text" id="name" />
                </div>
                <div className="input-group">
                  <label htmlFor="price">Item Price</label>
                  <input type="cost" id="price" />
                </div>
                <div className="input-group">
                <button type="submit" className="add-btn">
                  + Add
                </button>
                </div>
               
              </form>
            </div>

          </>
        )}
      </ul>
    </div>
  );
}
