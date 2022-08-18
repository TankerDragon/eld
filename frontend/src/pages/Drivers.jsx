import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { DiAndroid } from "react-icons/di";
import { ImPencil, ImCross } from "react-icons/im";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await fetch(`/api/drivers/`);
    const data = await response.json();
    console.log(data);
    setDrivers(data);
  };

  return (
    <Container>
      <Row>
        <h1>Drivers</h1>
        <SButton to={"/new-driver"}>Add Driver</SButton>
      </Row>
      <STable>
        <thead>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Username</th>
          <th>Co-Driver</th>
          <th>Vehicle</th>
          <th>App version</th>
          <th>Device info</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            return (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.first_name}</td>
                <td>{driver.last_name}</td>
                <td>{driver.username}</td>
                <td>*</td>
                <td>*</td>
                <td className="android">
                  <DiAndroid />
                  {driver.profile.app_version}
                </td>
                <td>*</td>
                <td className="actions">
                  <ImPencil className="pen" />
                  <ImCross className="cross" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </STable>
    </Container>
  );
}

const Container = styled.div`
  background: lightseagreen;
  width: calc(100% - 40px);
  margin: auto;
  margin-top: 50px;
  min-height: 80vh;
  border-radius: 20px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    color: #1d1d1d;
  }
`;

const SButton = styled(NavLink)`
  padding: 12px 18px;
  background: #00bfff;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  color: #1d1d1d;
  font-weight: bold;
`;

const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  padding: 0px;
  margin-top: 40px;

  td,
  th {
    border: 1px solid #1d1d1d;
    padding: 8px 10px;
  }
  tr:hover {
    background: lightblue;
  }
  .android {
    color: green;
    svg {
      margin-right: 7px;
    }
  }
  .actions {
    .pen,
    .cross {
      cursor: pointer;
    }
    .pen {
      color: #c49234;
      margin-right: 25px;
    }
    .cross {
      color: #c43f3f;
    }
  }
`;

export default Drivers;
