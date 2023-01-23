
import React,{ useState } from "react";
import "./App.css";
import { Limits } from "./Menu/Limits";
import ManualMenu from "./Menu/ManualMenu";
import MenuCreate from "./Menu/MenuCreate";

function App() {

  const [namePriceList, getNamePriceList] = useState([])
  const [budget, setBudget] = useState(0);
  const [time, setTime] = useState(0);
  const handleSubmit = (e)=>{

    // console.log(price);
    console.log(budget);
    console.log(time);
    e.preventDefault();

  };
  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>
          <MenuCreate />
          <ManualMenu
          getNamePriceList={getNamePriceList}
          namePriceList={namePriceList}
          />
          <Limits
          setBudget = {(e) => setBudget(e.target.value)}
          setTime = {(e) => setTime(e.target.value)}
          />

          <button className="submit" type="submit" onClick={handleSubmit}>Submit</button>
          
        </div>
      </div>
    </>
  );
}

export default App;
