import React from "react";
import { useState } from "react";

export default function ManualMenu( { setName , setPrice} ) {

  const [isShow, setIsShow] = useState(false);

  const handleShow = (e) => {
    setIsShow(e.target.checked)
  };

  return (
    <div className="menu-selection">
      <ul>
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            class="manualMenuInput"
            value="manualMenu"
            id="manualMenu"
            onChange={handleShow}
            
          />
          <label class="checkbox" for="manualMenu" >
            Manual Menu
          </label>
        </li>

        {isShow && (
          <>
            <div className="manualMenu">
              <form>
                <div className="input-group">
                  <label htmlFor="name">Name </label>
                  <input type="text" id="name" onChange={setName} />
                </div>
                <div className="input-group">
                  <label htmlFor="price">Item Price</label>
                  <input type="cost" id="price" onChange={setPrice}/>
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
