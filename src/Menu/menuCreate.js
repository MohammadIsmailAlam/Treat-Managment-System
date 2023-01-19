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
        <span class="of_notice">Choose Menu creation option</span>
      <ul class="check_box">
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            class="MenuInput"
            value="Menu"
            id="Menu"
            onChange={handleShow}
          />
          <label class="checkbox " for="Menu">
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
