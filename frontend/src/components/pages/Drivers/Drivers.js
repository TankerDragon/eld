import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { AnimatePresence } from "framer-motion";
import DriversTable from "./DriversTable";
import DriversForm from "./DriversForm";
import Loading from "../../common/Loading";
import { DRIVERS_URL, VEHICLES_LIST_URL } from "../../../constants/constants";

const Drivers = () => {
  const driverRequest = useRequest(DRIVERS_URL);
  const vehicleListRequest = useRequest(VEHICLES_LIST_URL);

  useEffect(() => {
    driverRequest.getData();
    vehicleListRequest.getData();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      driverRequest.getData();
      vehicleListRequest.getData();
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
        <h1>Drivers</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(true);
          }}
        >
          New Driver
        </button>
      </div>
      {
        driverRequest.isLoading || vehicleListRequest.isLoading ? <Loading /> :
        <div className="table-container">
          <DriversTable drivers={driverRequest.data} vehicles={vehicleListRequest.data} handleEdit={handleEdit} />
        </div>
      }
      <AnimatePresence initial={false}>
        {formOpen && <DriversForm vehicles={vehicleListRequest.data} closeForm={closeForm} method={method} edit={edit} />}
      </AnimatePresence>
    </div>
  );
};

export default Drivers;
