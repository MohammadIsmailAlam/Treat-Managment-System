import React from "react";
import { useState } from "react";

export default function ManualMenu({setnamePriceList,namePriceList}  ) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isShow, setIsShow] = useState(false);


  // const [isError, setIsError] = useState(false);

const [nameError, setNameError] = useState(false);
const [priceError, setPriceError] = useState(false);
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [isError, setIsError] = useState({});

//   const [isvalid, setIsValid] = useState('')
//   if (Object.keys(isvalid).length === 0 && isSubmit) {
//     console.log(isvalid)
//   }

//   const handleChange = (e) =>{
//     const{ name, price, value} = e.target;
//     setIsValid({...isvalid, [name]:value, [price]:value});
//     console.log(isvalid);
// }

//  const validate = (value) => {
//   const errors = {}
//   if (!value.name) {
//     errors.name = "Name Field Can Not Be Empty"
//   }

//   if (!value.price) {
//     errors.price = "Price Field Can Not Be Empty"
//   }
//   return errors
//  }

  const handleShow = (e) => {
    setIsShow(e.target.checked)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameError(true)
    }

    if (price.length === 0) {
      setPriceError(true)
    }
    if(name.length > 0 && price.length > 0) {
      setnamePriceList(prev=>{
        return [...prev,{
          name,price
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

        {isShow && (
          <>
            <div className="manualMenu">
              <form onSubmit={handleSubmit} id="myForm">
                <div className="input-group">
                  <label htmlFor="name">Name </label>
                  <input type="text" id="name" value={name}  
                  onChange={(e)=>{
                    setName(e.target.value)
                    setNameError(false)
                    }}/>

                    {
                      nameError && 
                  <div className="error" style={{color:'red', marginTop:'10px'}}> Name Can't Be Empty</div>

                    }

                </div>
                <div className="input-group">
                  <label htmlFor="price">Item Price</label>
                  <input type="number" id="price" value={price}   onChange={(e)=>{
                    setPrice(e.target.value)
                    setPriceError(false)
                    }}/>
                    {priceError && 
                  <div className="error" style={{color:'red', marginTop:'10px'}}> Price Can't Be Empty</div>
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
       {namePriceList.map((item,index)=>{
          return <li>{item.name} --- {item.price}</li>;
})}
       </ol>
      </ul>
    </div>
  );
}
