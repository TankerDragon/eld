import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
//
import Units from "./Units";
import Logs from "./Logs";
import Drivers from "./Drivers";
import Vehicles from "./Vehicles";
import Users from "./Users";

function Pages() {
  return (
    <Container>
      <Routes>
        <Route path="/units" element={<Units />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  background: lightblue;
  position: fixed;
  right: 0;
  width: calc(100% - 220px);
  height: 100vh;
`;

export default Pages;
