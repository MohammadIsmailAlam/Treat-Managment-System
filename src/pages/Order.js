import React, { useEffect, useState } from 'react'

export default function Order() {
    const [values, setValues] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/treats")
            .then((response) => response.json())
            .then((data) => {
                setValues(data[0]);
                console.log(data[0]);
            });
    }, []);

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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItem.length > 0 && values.manualMenuList) {
            const selectedItemsData = values.manualMenuList.filter(item => selectedItem.includes(item._id));
            if (selectedItemsData.length > 0) {
                alert(`Selected items: ${selectedItemsData.map(item => `${item.name}, ${item._id}`)}`);
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="ordersSeelection">
                    <header style={{textAlign: "center", marginTop: "10px"}}>
                        Order Form Here....
                    </header>
                    <div className="title" style={{
                        textAlign: "center",
                        marginTop: "10px",
                        backgroundColor: "lightblue",
                        fontSize: "24px"
                    }}>
                        <p style={{fontFamily: "monospace"}}>
                            Budget: {values.budgetLimitPerPerson} Time: {values.timeLimit}</p>
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