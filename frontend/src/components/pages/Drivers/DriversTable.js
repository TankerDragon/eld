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

const DriversTable = ({ drivers, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Truck</th>
          <th>Status</th>
          <th>App version</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver, index) => {
          return (
            <tr key={driver.id}>
              <td>{index + 1}</td>
              <td>{driver.user.first_name}</td>
              <td>{driver.user.last_name}</td>
              <td>{driver.user.username}</td>
              <td>{driver.user.email}</td>
              <td>{driver.phone}</td>
              <td>***</td>
              <td>{driver.is_active ? 'active': 'inactive'}</td>
              <td>{driver.app_version}</td>
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
