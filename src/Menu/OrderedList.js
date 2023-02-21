import React, { useEffect, useState } from 'react'

export default function OrderedList() {
    const [list, setList] = useState();


    useEffect(() => {
        fetch(`https://treat-management-system-691e2-default-rtdb.firebaseio.com/order.json`)
            .then((response) => response.json())
            .then((data) => {
                setList(data);
                console.log(data);
            });
    }, []);

  return (
    <div>OrderedList</div>
  )
}
