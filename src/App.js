import "./App.css";
import MenuCreate from "./Menu/MenuCreate";



function App() {
  return (
    <>
      <div className="Container">
        <div className="App">
          <h1> Create Your Treat</h1>
        <MenuCreate/>
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
        </div>
      </div>
    </>
  );
}

export default App;
