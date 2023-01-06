import { useState, useEffect } from "react";
import { STATES, TRUCK_YEARS, FUEL_TYPE } from "../../../constants/constants";
import useRequest from "../../../hooks/useRequest";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const VEHICLES_URL = "/api/vehicles/";

const VehiclesForm = ({ closeForm, method, edit }) => {

  const { errors, postPutData } = useRequest(VEHICLES_URL);

  // const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState(
    method === "PUT"
      ? edit
      : {
          unit_number: "",
          make: null,
          model: null,
          year: "Y23",
          license_state: "AK",
          license_number: null,
          vin_number: null,
          fuel_type: "di",
          eld_device: null,
          notes: null,
          is_active: true,
        }
  );

  // preparing dispatchers selections for the form
  // const DISPATCHERS = [];
  // DISPATCHERS.push(["", "--------"]);
  // for (let dispatcher of dispatchers) {
  //   DISPATCHERS.push([dispatcher.id, dispatcher.first_name + " " + dispatcher.last_name]);
  // }

  const handleChange = ({ currentTarget: input }) => {
    const newLog = { ...log };
    if (input.type == "checkbox") {
      newLog[input.name] = !newLog[input.name];
    } else {
      newLog[input.name] = input.value;
    }
    setLog(newLog);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate
    // const errors = validate();
    // setErrors(errors === null ? {} : errors);
    // console.log(errors);
    // if (errors) return;
    console.log("submitted", method);
    console.log(log);
    setErrMsg("");

    // post or put to server
    postPutData(method, log, closeForm);
      // closeForm({ reload: true });
  };

  return (
    <div className="form drivers-form">
      <div className="row">
        <h1>Add new vehicle</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input name="unit_number" type="text" value={log.unit_number} label="Unit number" onChange={handleChange} error={errors.unit_number} />
          <Input name="make" type="text" value={log.make} label="Make" onChange={handleChange} error={errors.make} />
          <Input name="model" type="text" value={log.model} label="Model" onChange={handleChange} error={errors.model} />
        </div>
        <div className="row">
          <Select name="year" selections={TRUCK_YEARS} isObject={true} value={log.year} label="Year" onChange={handleChange} error={errors.year} />
          <Input name="license_number" type="text" value={log.license_number} label="License number" onChange={handleChange} error={errors.license_number} />
          <Select name="license_state" selections={STATES} isObject={true} value={log.license_state} label="License State" onChange={handleChange} error={errors.license_state} />
        </div>
        <div className="row">
          <Select name="fuel_type" selections={FUEL_TYPE} isObject={true} value={log.fuel_type} label="Fuel Type" onChange={handleChange} error={errors.fuel_type} />
          <Input name="notes" type="text" value={log.notes} label="Notes" onChange={handleChange} error={errors.notes} />
          <Checkbox name="is_active" label="Active" checked={log.is_active} onChange={handleChange} error={errors.is_active}/>
        </div>

        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="buttons">
          <div>
            <button>OK</button>
            <button onClick={closeForm}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};  

export default VehiclesForm;
