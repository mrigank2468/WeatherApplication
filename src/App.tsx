
import "./App.scss";
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Home from "./Components/home/Home";
import WeatherDetails from "./Components/weatherdetails/WeatherDetails";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/weatherdetails/:city" element={<WeatherDetails/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
