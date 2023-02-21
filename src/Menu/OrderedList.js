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
      <h2>OrderedList</h2>
      {list && (
        <ul>
          {Object.values(list).map((item, index) => (
            <li key={index}>
            {`${item.itemsName} ---- ${item.name}`}
          </li>
          
          ))}
        </ul>
      )}
    </div>
  );
}
