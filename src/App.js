import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Details from "./Details";
import Limits from "./Menu/Limits";
import ManualMenu from "./Menu/ManualMenu";
import MenuCreate from "./Menu/MenuCreate";

function App() {

  const [img, setImg] = useState([])
  const [imgErrorMessage, setImgErrorMessage] = useState(null);

  const [namePriceList, setnamePriceList] = useState([]);
  const [budgetData, setBudget] = useState("");
  const [timeData, setTime] = useState("");

  const [budgetError, setBudgetError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [isMenuSelected, setIsMenuSelected] = useState(false);
  const [isMenualMenuSelected, setIsMenualMenuSelected] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(null);

  const [listError, setListError] = useState(null);

  const formData = {
    menuList: namePriceList,
    budget: budgetData,
    time: timeData,
  };

  useEffect(() => {
    if (isMenuSelected || isMenualMenuSelected) {
      setShouldShowError(false);
    }
  }, [isMenuSelected, isMenualMenuSelected]);

  useEffect(() => {
    if (listError !== null) {
      if (namePriceList.length === 0) {
        setListError(true);
      } else {
        setListError(false);
      }
    }
  }, [namePriceList]);


  useEffect(() => {
    if (imgErrorMessage !== null) {
      if (img.length === 0) {
        setImgErrorMessage(true);
      } else {
        setImgErrorMessage(false);
      }
    }
  }, [img]);

  const handleSubmit = (e) => {

    if (isMenuSelected && img.length === 0) {
      setImgErrorMessage(true);
    } else {
      setImgErrorMessage(false);
    }

    if (isMenuSelected || isMenualMenuSelected) {
      setShouldShowError(false);
    } else {
      setShouldShowError(true);
    }

    if (isMenualMenuSelected && namePriceList.length === 0) {
      setListError(true);
    } else {
      setListError(false);
    }

    if (budgetData.length === 0) {
      setBudgetError(true);
    }

    if (timeData.length === 0) {
      setTimeError(true);
    }

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const formValue = JSON.parse(localStorage.getItem("formData"))
  console.log('formValue----', formValue);

  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>
          <MenuCreate setIsMenuSelected={setIsMenuSelected}
            setImg={setImg}
            setErrorMessage={setImgErrorMessage} />
          {
            imgErrorMessage &&
            <div className="error" style={{ color: 'red', marginTop: '10px' }}> Upload Img </div>
          }
          <ManualMenu
            setnamePriceList={setnamePriceList}
            namePriceList={namePriceList}
            setIsMenualMenuSelected={setIsMenualMenuSelected}
          />

          {shouldShowError && (
            <div className="error" style={{ color: "red", marginTop: "10px" }}>
              Choose At List One
            </div>
          )}

          {listError && (
            <div className="error" style={{ color: "red", marginTop: "10px" }}>
              Make One
            </div>
          )}
          <Limits
            setbudget={setBudget}
            settime={setTime}
            budgetError={budgetError}
            timeError={timeError}
            setBudgetError={setBudgetError}
            setTimeError={setTimeError}
          />
          <button className="submit" onClick={handleSubmit}> 
            Submit
          </button>
        </div>
        <Details formData={formValue}/> 
      </div>


    </>
  );
}

export default App;
