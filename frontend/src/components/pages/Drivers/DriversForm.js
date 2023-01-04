import { useState, useEffect } from "react";
import { STATES } from "../../../constants/constants";
import useRequest from "../../../hooks/useRequest";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const DRIVERS_URL = "/api/drivers/";

const DriversForm = ({ closeForm, method, edit }) => {

  const { errors, postPutData } = useRequest(DRIVERS_URL);

  // const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState(
    method === "PUT"
      ? {
        ...edit.user,
        ...edit,
      }
      : {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          is_active: true,
          username: "",
          password: "",
          cdl_number: "",
          cdl_state: "AK",
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
        <h1>Add new driver</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input name="first_name" type="text" value={log.first_name} label="First name" onChange={handleChange} error={errors.first_name} />
          <Input name="last_name" type="text" value={log.last_name} label="Last name" onChange={handleChange} error={errors.last_name} />
        </div>
        <div className="row">
          <Input name="email" type="text" value={log.email} label="Email" onChange={handleChange} error={errors.email} />
          <Input name="phone" type="text" value={log.phone} label="Phone" onChange={handleChange} error={errors.phone} />
          <Checkbox name="is_active" label="Active" checked={log.is_active} onChange={handleChange} error={errors.is_active}/>
        </div>
        <div className="row">
          <Input name="username" type="text" value={log.username} label="Username" onChange={handleChange} error={errors.username} />
          <Input name="password" type="text" value={log.password} label="Password" onChange={handleChange} error={errors.password} />
          <Input name="confirm_password" type="text" value={log.confirm_password} label="Confirm Password" onChange={handleChange} error={errors.confirm_password} />
        </div>
        <div className="row">
          <Input name="cdl_number" type="text" value={log.cdl_number} label="Driver License Number" onChange={handleChange} error={errors.cdl_number} />
          <Select name="cdl_state" selections={STATES} isObject={true} value={log.cdl_state} label="License State" onChange={handleChange} error={errors.cdl_state} />
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

export default DriversForm;
