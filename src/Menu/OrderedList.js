import React, { useEffect, useState } from 'react';

export default function OrderedList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`https://treat-management-system-691e2-default-rtdb.firebaseio.com/order.json`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
        
      <h2 className='orderList'>
        OrderedList
        </h2>

      {list && (
        <ul>
          {Object.values(list).map((item, index) => (
            <li
              key={index}
              style={{
                border: "1px solid grey",
                borderRadius: "12px",
                padding: "2em",
                margin: "2em",
                background: "aliceblue",
                position: "relative",
              }}
            >
              <span>{`${item.itemsName} ---- ${item.name}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}