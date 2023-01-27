
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

  const [checkboxMenuError, setCheckBoxMenuError] = useState (false)
  const [checkboxManualMenuError, setCheckBoxMAnualMenuError] = useState (false)


  const formData = {
    
    'Menu List': namePriceList,
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

    if (!checkboxMenuError) {
      setCheckBoxMenuError(true)
    }else {
      setCheckBoxMenuError(false)
    }

    

    if (!checkboxManualMenuError) {
      setCheckBoxMAnualMenuError(true)
    }else {
      setCheckBoxMAnualMenuError(false)
    }


    localStorage.setItem('Menu', JSON.stringify(formData));
   
  };



  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>

          <MenuCreate 
          setCheckBoxMenuError={setCheckBoxMenuError}
          />
          <ManualMenu
          setnamePriceList={setnamePriceList}
          namePriceList={namePriceList}
          setCheckBoxMAnualMenuError={setCheckBoxMAnualMenuError}
          />
          { 
          (checkboxMenuError || checkboxManualMenuError) &&
            <div className="error" style={{color:'red', marginTop:'10px'}}> Choose At list one</div>
          }
          

          <Limits setbudget={setBudget} settime={setTime} 
          budgetError={budgetError} timeError={timeError} 
          setBudgetError={setBudgetError} setTimeError={setTimeError}
          />

          <button className="submit"  onClick={handleSubmit}>Submit</button>
          
        </div>
      </div>
    </>
  );
}

export default App;
