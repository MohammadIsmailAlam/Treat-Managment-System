import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Limits from "../Menu/Limits";
import ManualMenu from "../Menu/ManualMenu";
import MenuCreate from "../Menu/MenuCreate";
const Home = () => {

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

  const navigate = useNavigate();


  const location = useLocation();
  useEffect(()=> {
    console.log(location);
    if (location.state) {
      setnamePriceList(location.state.menuList)
      setBudget(location.state.budget)
      setTime(location.state.time)
      window.history.replaceState({}, document.title)
    }
  }, [location])


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

    const formData = {
      "budget": budgetData,
      "time": timeData,
    };

    if (isMenuSelected) {
      formData.img = img
    }

    if (isMenualMenuSelected) {
      formData.menuList = namePriceList
    }
    console.log('formData',formData)
    
    if (formData.menuList && formData.budget && formData.time) {
        navigate('/details', {state: {menuList:namePriceList, budget:budgetData, time: timeData, isChecked: isMenualMenuSelected}});
      }
      if (formData.img && formData.budget && formData.time) {
        navigate('/details', {state: {img:img, budget:budgetData, time: timeData,  isChecked: isMenuSelected}});
      }
  };

  return (
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
          budgetData = {budgetData}
            setbudget={setBudget}
            timeData = {timeData}
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
      </div>
  )
}

export default Home