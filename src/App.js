import "./App.css";

function App() {
  return (
    <>
    <div className="container">
    <div className="row">
        <div className="col-6">
          <div className="App">
            <h1> Create Your Treat</h1>
          </div>

          <div>
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
              <input type="text" placeholder="Budget Per Person"></input>
            </div>

            <div class="time">
              <input type="time" placeholder="Time Limite"></input>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6">
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
          </div>
    </div>
    </>
  );
}

export default App;
