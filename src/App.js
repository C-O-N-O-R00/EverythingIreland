import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Radar from "./pages/Radar";
import Grocery from "./pages/Grocery";
import Electricity from "./pages/Electricity";
import Transport from "./pages/Transport";
import Alerts from "./pages/Alerts";
import About from "./pages/About";
import Weather from "./pages/Weather";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/grocery" style={{ marginRight: "15px" }}>Grocery</Link>
          <Link to="/electricity" style={{ marginRight: "15px" }}>Electricity</Link>
          <Link to="/transport" style={{ marginRight: "15px" }}>Transport</Link>
          <Link to="/alerts" style={{ marginRight: "15px" }}>Alerts</Link>
<Link to="/radar" style={{ marginRight: "15px" }}>Radar</Link>
<Link to="/weather" style={{ marginRight: "15px" }}>Weather</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/electricity" element={<Electricity />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/alerts" element={<Alerts />} />
<Route path="/weather" element={<Weather />} />
<Route path="/radar" element={<Radar />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

