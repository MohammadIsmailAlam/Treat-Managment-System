import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Order() {
    const [values, setValues] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tradeId = searchParams.get('tradeId');

    console.log(tradeId);
    // useEffect(() => {
    //     alert(tradeId)
    // }, [])

    const handleChecked = (e) => {
        const id = e.target.value;
        setSelectedItem(prevSelectedItems => {
            if (e.target.checked) {
                return [...prevSelectedItems, id];
            } else {
                return prevSelectedItems.filter(item => item !== id);
            }
        });
        console.log("selected");
    };

    useEffect(() => {
        fetch(`https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${tradeId}.json`)
            .then((response) => response.json())
            .then((data) => {
                setValues(data);
                setRemainingTime(data.timeLimit * 60 * 1000);
                console.log(data);
            });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(remainingTime - 1000);
        }, 1000);
            clearInterval(intervalId);
    }, [remainingTime]);


    const formatTime = (time) => {
        const hours = Math.floor( (time/(1000*60*60)) % 24 );
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        return `${hours}:${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItem.length > 0 && values.manualMenuList) {
            const selectedItemsData = values.manualMenuList.filter(item => selectedItem.includes(item._id));
            if (selectedItemsData.length > 0) {
                console.log(`Selected items: ${selectedItemsData.map(item => `${item.name} ${item._id}`)}`);
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="ordersSeelection">
                    <header style={{ textAlign: "center", marginTop: "10px" }}>
                        Order Form Here....
                    </header>
                    <div className="title" style={{
                        textAlign: "center",
                        marginTop: "10px",
                        backgroundColor: "lightblue",
                        fontSize: "24px"
                    }}>
                        <p style={{ fontFamily: "monospace" }}>
                            Budget: {values.budgetLimitPerPerson}</p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p>Time Limit: {formatTime(remainingTime)}</p>
                    </div>

                    <form className='order' style={{ display: "block" }} onSubmit={handleSubmit}>
                        {values?.manualMenuList?.map((_data, index) => (
                            <li key={index}
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "12px",
                                    padding: "2em",
                                    margin: "2em",
                                    background: "aliceblue",
                                    position: "relative"
                                }}
                            >
                                <div className='checkboxes'>
                                    <label>
                                        <input type="checkbox" name="selectedItems" value={_data._id} onChange={handleChecked} />
                                        {_data.name} ---- {_data.price}
                                    </label>
                                </div>
                            </li>
                        ))}
                        <div className='input' style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "2em",
                            margin: "2em"
                        }}>
                            <button type="submit" style={{
                                border: "1px solid grey",
                                borderRadius: "12px",
                                background: "aliceblue",
                                marginLeft: "10px",
                                position: "relative"
                            }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}