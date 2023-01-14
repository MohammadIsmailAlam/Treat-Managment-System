import "./App.css";


function App() {
  return (
    <>
      <div className="container">
        <div className="App">
          <h1> Create Your Treat</h1>
          
          <div class="menu_selection">
            <h3>Menu Create Options</h3>
            <div>
              <span class="of_notice">Choose Menu creation option</span>
            </div>
            <ul class="check_box">
              <li>
                <input
                  name="menuTypeList"
                  type="checkbox"
                  class="MenuInput"
                  value="Menu"
                />
                <label class="checkbox " for="Menu">
                  Menu
                </label>
              </li>
              <li>
                <input
                  name="menuTypeList"
                  type="checkbox"
                  class="manualMenuInput"
                  value="manualMenu"
                />
                <label class="checkbox" for="manualMenu">
                  Manual Menu
                </label>

              </li>
            </ul>
          </div>

          <div className="selection">
            <div className="img">
              <div>
                <img src="addImg.png" alt=""></img>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                ></input>
              </div>
            </div>

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

        <div className="App">
          <form>
            <div className="input-group">
              <label htmlFor="name">Name </label>
              <input type="text" id="name" />
            </div>
            <div className="input-group">
              <label htmlFor="price">Item Price</label>
              <input type="cost" id="price" />
            </div>
            <button type="submit" className="add-btn">
              + Add new items
            </button>
          </form>
        </div>
        <div className="details"></div>
      </div>
    </>
  );
}

export default App;
