import React from "react";
import { useState } from "react";

export default function MenuCreate( setImg) {
  const [isShow, setIsShow] = useState(false);
  const handleShow = (e) => {
    setIsShow(e.target.checked)
  };


  return (
    <div className="menu_selection">
      <h3>Menu Create Options</h3>
        <span className="of_notice">Choose Menu creation option</span>
      <ul className="check_box">
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            className="MenuInput"
            value="Menu"
            id="Menu"
            onChange={handleShow}
          />
          <label className="checkbox " htmlFor="Menu">
            Menu
          </label>
        </li>

        {
          isShow &&
          <div className="img">
              <input
                type="file"
                multiple
                accept="image/jpeg, image/png, image/jpg"
              />
          </div>
        }
      </ul>
    </div>
  );
}
