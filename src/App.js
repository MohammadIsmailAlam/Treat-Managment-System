
import React,{ useState } from "react";
import { useEffect } from "react";
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


  const [isMenuSelected, setIsMenuSelected] = useState(false)
  const [isMenualMenuSelected, setIsMenualMenuSelected] = useState(false)
  const [shouldShowError, setShouldShowError] = useState(null)


  const formData = {
    
    'NamePriceList': namePriceList,
    'Budget Limit': budgetData,
    'Time Limit': timeData
  }
  
  useEffect(()=> {
    if (isMenuSelected || isMenualMenuSelected) {
      setShouldShowError(false)
    }
  },[
    isMenuSelected, isMenualMenuSelected
  ])
  
  const handleSubmit = (e)=>{

    if (isMenuSelected || isMenualMenuSelected) {
      setShouldShowError(false)
    } else {
      setShouldShowError(true)
    }

    if (budgetData.length === 0) {
      setBudgetError(true)
    }

    if (timeData.length === 0) {
      setTimeError(true)
    }

    localStorage.setItem('formData', JSON.stringify(formData));
   
  };



  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>
          <MenuCreate
          setIsMenuSelected={setIsMenuSelected} 
          />
          <ManualMenu
          setnamePriceList={setnamePriceList}
          namePriceList={namePriceList}
          setIsMenualMenuSelected={setIsMenualMenuSelected}
          />

          {
            shouldShowError &&
            <div className="error" style={{color: 'red', marginTop:'10px'}}>
              Choose At List One
            </div>
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
