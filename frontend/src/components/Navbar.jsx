import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { FiMap, FiTablet, FiUsers, FiTruck } from "react-icons/fi";

function Navbar() {
  return (
    <Nav>
      <div className="logo-container">
        <img src={logo} alt="logo" width={150} />
      </div>
      <h3>Main</h3>
      <ul>
        <li>
          <SLink to={"/units"}>
            <FiMap />
            All Units
          </SLink>
        </li>
        <li>
          <SLink to={"/logs"}>
            <FiTablet />
            Logs
          </SLink>
        </li>
        <li>
          <SLink to={"/"}>
            <FiTruck />
            Tracking
          </SLink>
        </li>
      </ul>
      <h3>Units</h3>
      <ul>
        <li>
          <SLink to={"/drivers"}>
            <FiUsers />
            Drivers
          </SLink>
        </li>
        <li>
          <SLink to={"/vehicles"}>
            <FiTruck />
            Vehicles
          </SLink>
        </li>
        <li>
          <SLink to={"/users"}>
            <FiUsers />
            Users
          </SLink>
        </li>
      </ul>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.div`
  background: lightseagreen;
  position: fixed;
  left: 0;
  width: 220px;
  height: 100vh;
  color: #1d1d1d;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 30px 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: bolder;
    margin: 25px 0 10px 15px;
  }
`;

const SLink = styled(NavLink)`
  padding: 10px 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1d1d1d;

  svg {
    font-size: 1.2rem;
    margin-right: 10px;
  }
  :hover {
    cursor: pointer;
    background: #3bd5ff;
  }
`;
