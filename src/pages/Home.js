import React, { useState,useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Limits from "../Components/Limits";
import ManualMenu from "../Components/ManualMenu";
// import MenuCreate from "../Components/MenuCreate";
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
      setImg(location.state.img)
      setnamePriceList(location.state.menuList)
      setBudget(location.state.budget)
      setTime(location.state.time)
      setIsMenuSelected(location.state.isMenuChecked)
      setIsMenualMenuSelected(location.state.isMenualMenuChecked)
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

  const handleBackButton = () => {
    navigate("/DashBoard");
  };

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

    // if (formData.img?.length && formData.budget && formData.time) {
    //   navigate('/details', {state: {img:img, budget:budgetData, time: timeData,  isMenuChecked: isMenuSelected}});
    // }
    
    if ((img.length || namePriceList.length > 0) && budgetData && timeData) {
      navigate("/details", {
        state: {
          img: img,
          menuList: namePriceList,
          budget: budgetData,
          time: timeData,
          isMenualMenuChecked: isMenualMenuSelected,
          isMenuChecked: isMenuSelected,
        },
      });
    }
  };

  return (
    <div className="Container">
        <div className="App">

        <header>
          <button className="goBack" onClick={handleBackButton}>
            <FaArrowLeft />
          </button>
        </header>

          <h1> Create Your Treat</h1>
          {/* <MenuCreate 
          isMenuSelected={isMenuSelected}
          setIsMenuSelected={setIsMenuSelected}
          img={img}
            setImg={setImg}
            setErrorMessage={setImgErrorMessage}
            />
          {
            imgErrorMessage &&
            <div className="error" style={{ color: 'red', marginTop: '10px' }}> Upload Img </div>
          } */}
          <ManualMenu
            setnamePriceList={setnamePriceList}
            namePriceList={namePriceList}
            isMenualMenuSelected={isMenualMenuSelected}
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