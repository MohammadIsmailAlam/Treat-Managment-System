import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "../App";
import Limits from "../Components/Limits";
import ManualMenu from "../Components/ManualMenu";
import HoldAndPressButton from "../Components/HoldAndPressBtn";
const Menu = () => {
  const [img, setImg] = useState([]);
  const [namePriceList, setnamePriceList] = useState([]);
  const [budgetData, setBudget] = useState("");
  const [timeData, setTime] = useState("");

  const [searchParam, setSearchParam] = useSearchParams();
  const key = searchParam.get("key");
  // console.log("Key ", key);

  const [imgErrorMessage, setImgErrorMessage] = useState(null);
  const [budgetError, setBudgetError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(null);
  const [listError, setListError] = useState(null);

  const [isMenuSelected, setIsMenuSelected] = useState(false);
  const [isMenualMenuSelected, setIsMenualMenuSelected] = useState(false);


  const [isPublicTemplate, setIsPublicTemplate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(userContext);

  const [caption, setCaption] = useState("");
  const handleInputChange = (event) => {
    setCaption(event.target.value);
  };

  const state = {
    manualMenuList: namePriceList,
    budgetLimitPerPerson: budgetData,
    timeLimit: timeData,
    selectedBy: [],
    userEmail: context.userEmail,
    caption: caption,
    key: key,
    template: isPublicTemplate,
  };

  useEffect(() => {
    console.log("from menu", location.state);
    if (location.state?.manualMenuList) {
      setnamePriceList([...location?.state?.manualMenuList]);
      setBudget(location?.state?.budgetLimitPerPerson);
      setTime(location?.state?.timeLimit);
      setCaption(location?.state?.caption);
      setIsPublicTemplate(location?.state?.templet);
    }
  }, []);

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
      budget: budgetData,
      time: timeData,
    };

    if (isMenuSelected) {
      formData.img = img;
    }

    if (isMenualMenuSelected) {
      formData.menuList = namePriceList;
    }
    console.log("formData", formData);

    // if (formData.img?.length && formData.budget && formData.time) {
    //   navigate('/details', {state: {img:img, budget:budgetData, time: timeData,  isMenuChecked: isMenuSelected}});
    // }
    if (
      (img && img.length > 0) ||
      (namePriceList && namePriceList.length > 0)
    ) {
      const requestOptions = {
        method: key ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      };

      let url =
        "https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json";
      if (key) {
        url = `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${key}.json`;
      }
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(typeof data);
        });

      navigate("/DashBoard");
    }
  };

  return (
    <div className="Container">
      <div className="App">
        <input
          type="text"
          className="form-control"
          placeholder="Caption your source of misery......"
          value={caption}
          onChange={handleInputChange}
        />
        <div className="row" style={{ display: "flex", marginLeft: "10em" }}>
          <div className="col-6">
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
              <div
                className="error"
                style={{ color: "red", marginTop: "10px" }}
              >
                {/* Choose At List One */}
                Make A Menu First
              </div>
            )}

            {/* {listError && (
              <div
                className="error"
                style={{ color: "red", marginTop: "10px" }}
              >
                Make One
              </div>
            )} */}
          </div>
          <div className="col-6">
            <Limits
              budgetData={budgetData}
              setbudget={setBudget}
              timeData={timeData}
              settime={setTime}
              budgetError={budgetError}
              timeError={timeError}
              setBudgetError={setBudgetError}
              setTimeError={setTimeError}
              isPublicTemplate={isPublicTemplate}
              setIsPublicTemplate={setIsPublicTemplate}
            />
          </div>

          <div className="btn-submit">
            <HoldAndPressButton
              isBtnParamFull={"btn-submit" !== ""}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
