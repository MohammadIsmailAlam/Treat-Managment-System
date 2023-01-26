
import React,{ useState } from "react";
import "./App.css";
import Limits from "./Menu/Limits";
import ManualMenu from "./Menu/ManualMenu";
import MenuCreate from "./Menu/MenuCreate";

function App() {

  const [namePriceList, setnamePriceList] = useState([])
  const [budgetData, setBudget] = useState('')
  const [timeData, setTime] = useState('')

  const [budgetError, setBudgetError] = useState(false)
  const [timeError, setTimeError] = useState(false)


  const formData = {
    
    'NamePriceList': namePriceList,
    'Budget Limit': budgetData,
    'Time Limit': timeData
  }
  
  
  const handleSubmit = (e)=>{

    if (budgetData.length === 0) {
      setBudgetError(true)
    }

    if (timeData.length === 0) {
      setTimeError(true)
    }
    
    // console.log(namePriceList);

    // console.log("Buget  " + budgetData, "Time  " + timeData);
    localStorage.setItem('formData', JSON.stringify(formData));
   
  };



  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>
          <MenuCreate />
          <ManualMenu
          setnamePriceList={setnamePriceList}
          namePriceList={namePriceList}
          />
          <Limits setbudget={setBudget} settime={setTime} 
          budgetError={budgetError} timeError={timeError} 
          setBudgetError={setBudgetError} setTimeError={setTimeError}
          // setBudget = {(e) => setBudget(e.target.value)}
          // setBudget = {(e) => setBudget(e.target.value)}
          // setTime = {(e) => setTime(e.target.value)}
          />

          <button className="submit"  onClick={handleSubmit}>Submit</button>
          
        </div>
      </div>
    </>
  );
}

export default App;
