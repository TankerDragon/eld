import { Route, Routes } from "react-router-dom";
import { ROLES } from "./constants/constants";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Missing from "./components/Missing";
import GrossBoard from "./components/pages/GrossBoard/GrossBoard";
import Users from "./components/pages/Users/Users";
import Drivers from "./components/pages/Drivers/Drivers";
import Vehicles from "./components/pages/Vehicles/Vehicles";
import Logs from "./components/pages/Logs/Logs";
import Log from "./components/pages/Logs/Log";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import "./styles/App.css";
import "./styles/index.css";
import "./styles/home.css";
import "./styles/eld.css";

const App = () => {
  return (
    <div id="App" className="App">
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* protected routes */}
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Owner, ROLES.Staff]} />}>
            <Route path="gross-board" element={<GrossBoard />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="users" element={<Users />} />
            <Route path="logs" element={<Logs />} />
            <Route path="logs/:id/:date" element={<Log />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
