import React from "react";
import logo from "../images/logo.png";
import { FiMap, FiTablet, FiUsers, FiTruck } from "react-icons/fi";
// importing styles
import { Style } from "./styles/Style.style";

function Navbar() {
  return (
    <Style.Nav>
      <div className="logo-container">
        <img src={logo} alt="logo" width={150} />
      </div>
      <h3>Main</h3>
      <ul>
        <li>
          <Style.SLink to={"/units"}>
            <FiMap />
            All Units
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/logs"}>
            <FiTablet />
            Logs
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/"}>
            <FiTruck />
            Tracking
          </Style.SLink>
        </li>
      </ul>
      <h3>Units</h3>
      <ul>
        <li>
          <Style.SLink to={"/drivers"}>
            <FiUsers />
            Drivers
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/vehicles"}>
            <FiTruck />
            Vehicles
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/users"}>
            <FiUsers />
            Users
          </Style.SLink>
        </li>
      </ul>
    </Style.Nav>
  );
}

export default Navbar;
