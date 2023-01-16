import React from "react";
import { useState } from "react";
import ManualMenu from "./ManualMenu";

export default function MenuCreate() {
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);
  return (
    <div class="menu_selection">
      <h3>Menu Create Options</h3>
        <span class="of_notice">Choose Menu creation option</span>
      <ul class="check_box">
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            class="MenuInput"
            value="Menu"
            onChange={handleShow}
          />
          <label class="checkbox " for="Menu" onClick = {handleClose}>
            Menu
          </label>
        </li>

        {
          isShow &&
          <div className="img">
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
              ></input>
          </div>
        }
      </ul>
      <ManualMenu/>
    </div>
  );
}
