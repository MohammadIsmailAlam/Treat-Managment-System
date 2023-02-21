import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

export default function Order() {
    const [values, setValues] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const location = useLocation();
    const { treatId } = useParams();

    console.log(treatId);
    
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
        fetch(`https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${treatId}.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                setValues(data);
                setRemainingTime(data?.timeLimit * 60 * 1000); // add a check for data before accessing timeLimit
            })
            .catch((error) => {
                console.log("error", error);
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
    
        if (!name) { // check if name is empty
            setNameError(true);
            return;
        }
    
        if (selectedItem.length > 0 && values.manualMenuList) {
            const selectedItemsData = values.manualMenuList.filter(item => selectedItem.includes(item.id));
            if (selectedItemsData.length > 0) {
                console.log(`Selected items: ${selectedItemsData.map(item => `${item.name} ${item.id}`)}`);
            }
        }
    
        console.log("the items are", selectedItem);
        fetch('https://treat-management-system-691e2-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                itemsName: selectedItem
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data posted:', data);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    };    

    return (
        <div className="container">
        <div className="row">
            <div className="ordersSeelection">
                <header style={{ textAlign: "center", marginTop: "10px" }}>
                    Order Form Here....
                </header>
                {values && (
                    <div className="title" style={{
                        textAlign: "center",
                        marginTop: "10px",
                        backgroundColor: "lightblue",
                        fontSize: "24px"
                    }}>
                        <p style={{ fontFamily: "monospace" }}>
                            Budget: {values.budgetLimitPerPerson}</p>
                    </div>
                )}

                    <div style={{ textAlign: 'center' }}>
                        <p>Time Limit: {formatTime(remainingTime)}</p>
                    </div>

                    <form className='order' style={{ display: "block" }} onSubmit={handleSubmit}>
                        {values?.manualMenuList?.map((data, index) => (
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
                                        <input type="checkbox" name="selectedItems" value={data.id} onChange={handleChecked} />
                                        {data.name} ---- {data.price}
                                    </label>
                                </div>
                            </li>
                        ))}
                        <div className="form-group">
                            <label htmlFor="name">Name </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                style={{ marginRight: "10px" }}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError(false);
                                }}
                            />

                            {nameError && (
                                <div
                                    className="error"
                                    style={{ color: "red", marginTop: "10px" }}
                                >
                                    {" "}
                                    Name Can't Be Empty
                                </div>
                            )}
                        </div>
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