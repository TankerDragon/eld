import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { AnimatePresence } from "framer-motion";
import { VEHICLES_URL } from "../../../constants/constants";
import VehiclesTable from "./VehiclesTable";
import VehiclesForm from "./VehiclesForm";
import Loading from "../../common/Loading";

const Vehicles = () => {
  const { data, getData, isLoading } = useRequest(VEHICLES_URL);

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
            setFormOpen(true);
          }}
        >
          New Vehicle
        </button>
      </div>
      {
        isLoading ? <Loading /> :
        <div className="table-container">
          <VehiclesTable vehicles={data} handleEdit={handleEdit} />
        </div>
      }
      <AnimatePresence initial={false}>
        {formOpen && <VehiclesForm closeForm={closeForm} method={method} edit={edit} />}
      </AnimatePresence>
    </div>
  );
};

export default Vehicles;
