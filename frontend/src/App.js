import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Link } from "react-router-dom";
import Pages from "./components/pages/Pages"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
