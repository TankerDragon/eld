// import icons
import { BsPencil } from "react-icons/bs";

const getName = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.first_name + " " + name.last_name;
  }
  return "! name not found !";
};

const getChoice = (choice, choices) => {
  let found = "!!! not found !!!";
  Object.keys(choices).forEach((ch) => {
    if (ch === choice) {
      found = choices[ch];
    }
  });
  return found;
};

const DRIVER_TYPE = {
  O88: "Owner operator - 88%",
  O85: "Owner operator - 85%",
  C30: "Company driver - 30%",
  C35: "Company driver - 35%",
  L: "Lease operator",
  R: "Rental operator",
};

const DriversTable = ({ drivers, dispatchers, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Dispatcher</th>
          <th>Driver type</th>
          <th>Gross target</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver, index) => {
          return (
            <tr key={driver.id}>
              <td>{index + 1}</td>
              <td>{driver.first_name}</td>
              <td>{driver.last_name}</td>
              <td>{getName(driver.dispatcher, dispatchers)}</td>
              <td>{getChoice(driver.driver_type, DRIVER_TYPE)}</td>
              <td>{driver.gross_target}</td>
              <td>
                <div className="actions">
                  <div
                    className="icon-holder"
                    onClick={() => {
                      handleEdit(driver);
                    }}
                  >
                    <BsPencil className="icon edit" />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DriversTable;
