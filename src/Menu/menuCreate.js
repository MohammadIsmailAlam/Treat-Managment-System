import React, { useEffect } from "react";
import { useState } from "react";

export default function MenuCreate( {setImg, setIsMenuSelected, setErrorMessage, isMenuSelected} ) {
  const [isShow, setIsShow] = useState(false);
  const [imgURL, setImgURL] = useState("");

  useEffect(()=>{
    if(isMenuSelected){
      setIsShow(true)
    }
  },[isMenuSelected])

  const handleShow = (e) => {
    setIsShow(e.target.checked)
    setIsMenuSelected(e.target.checked)
  };

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) {
      setErrorMessage(true);
    } else {
      setImg(URL.createObjectURL(e.target.files[0]))
      setImgURL(URL.createObjectURL(e.target.files[0]));
    }
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
            checked={isShow}
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
                onChange={handleImageUpload}
              />
              {imgURL && <img src={imgURL} alt="Selected-" />}
          </div>
        }
      </ul>
    </div>
  );
}
