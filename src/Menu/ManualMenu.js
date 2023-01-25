import React from "react";
import { useState } from "react";

export default function ManualMenu({setnamePriceList,namePriceList}  ) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleShow = (e) => {
    setIsShow(e.target.checked)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setnamePriceList(prev=>{
      return [...prev,{
        name,price
      }]
    })
    setName("")
    setPrice("")
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

        {isShow && (
          <>
            <div className="manualMenu">
              <form onSubmit={handleSubmit} id="myForm">
                <div className="input-group">
                  <label htmlFor="name">Name </label>
                  <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="input-group">
                  <label htmlFor="price">Item Price</label>
                  <input type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <button type="submit" className="add-btn">
                  + Add
                </button>
              </form>
            </div>

          </>
        )}

       <ol>
       {namePriceList.map((item,index)=>{
          return <li>{item.name} --- {item.price}</li>;
})}
       </ol>
      </ul>
    </div>
  );
}
