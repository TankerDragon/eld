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

const VehiclesTable = ({ vehicles, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>Truck</th>
          <th>Driver</th>
          <th>Make / Model</th>
          <th>License number</th>
          <th>License state</th>
          <th>VIN number</th>
          <th>ELD</th>
          <th>Notes</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => {
          return (
            <tr key={vehicle.id}>
              <td>{index + 1}</td>
              <td>{vehicle.unit_number}</td>
              <td>***</td>
              <td>{vehicle.make} / {vehicle.model}</td>
              <td>{vehicle.license_number}</td>
              <td>{vehicle.license_state}</td>
              <td>{vehicle.vin_number}</td>
              <td>{vehicle.eld_device}</td>
              <td>{vehicle.notes}</td>
              <td>{vehicle.is_active ? 'active': 'inactive'}</td>
              <td>
                <div className="actions">
                  <div
                    className="icon-holder"
                    onClick={() => {
                      handleEdit(vehicle);
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



export default VehiclesTable;
