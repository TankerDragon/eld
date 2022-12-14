import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { VEHICLES_URL } from "../../../constants/constants";
import VehiclesTable from "./VehiclesTable";
import VehiclesForm from "./VehiclesForm";

const Vehicles = () => {
  const { data, getData } = useRequest(VEHICLES_URL);

  useEffect(() => {
    getData();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      getData();
    }
  };

  const handleEdit = (driver) => {
    setEdit(driver);
    setMethod("PUT");
    setFormOpen(true);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Vehicles</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New Vehicle
        </button>
      </div>
      <div className="table-container">
        <VehiclesTable vehicles={data} handleEdit={handleEdit} />
      </div>
      {formOpen && <VehiclesForm closeForm={closeForm} method={method} edit={edit} />}
    </div>
  );
};

export default Vehicles;
