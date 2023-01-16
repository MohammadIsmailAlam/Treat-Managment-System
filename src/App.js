import { useState } from "react";
import "./App.css";
import ManualMenu from "./Menu/ManualMenu";
import MenuCreate from "./Menu/MenuCreate";

function App() {
  const [name, setName] = useState("");
  const handleSubmit = (e)=>{
    console.log(name);
    e.preventDefault();

  };
  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>
          <MenuCreate />
          <ManualMenu
          setName = {(e) => setName(e.target.value)}
          />
          
          <div className="selection">  
            <div class="budget">
              <h3> Give Bugget Limition</h3>
              <input type="text" placeholder="Budget Per Person"></input>
            </div>

            <div class="time">
              <h3> Set Time</h3>
              <input type="time" placeholder="Time Limite"></input>
            </div>
          </div>
          <button className="submit" type="submit" onClick={handleSubmit}>Submit</button>
          
        </div>
      </div>
    </>
  );
}

export default App;
