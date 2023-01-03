import { useEffect, useState } from "react";
import useMessage from "../../../hooks/useMessage";
import useRequest from "../../../hooks/useRequest";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import DriversTable from "./DriversTable";
import DriversForm from "./DriversForm";

const DRIVERS_URL = "/api/drivers/";

const Drivers = () => {
  const { data, getData } = useRequest(DRIVERS_URL);

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
        <h1>Drivers</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New Driver
        </button>
      </div>
      <DriversTable drivers={data} handleEdit={handleEdit} />
      {formOpen && <DriversForm closeForm={closeForm} method={method} edit={edit} />}
    </div>
  );
};

export default Drivers;
