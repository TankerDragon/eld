import { useState, useEffect } from "react";
import useRequest from "../../../hooks/useRequest";
import Input from "../../common/Input";
import Checkbox from "../../common/Checkbox";
import Select from "../../common/Select";

const USERS_URL = "/api/users/";

const UsersForm = ({ closeForm, method, edit }) => {
  const { errors, postPutData } = useRequest(USERS_URL);

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState(
    method === "PUT"
      ? {
        ...edit.user,
        ...edit
      }
      : {
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          is_active: true,
          create_user: true,
          update_user: true,
          activate_user: true,
          create_driver: true,
          update_driver: true,
          activate_driver: true
        }
  );

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
        <h1>Add new user</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input name="first_name" type="text" value={log.first_name} label="First name" onChange={handleChange} error={errors.first_name} />
          <Input name="last_name" type="text" value={log.last_name} label="Last name" onChange={handleChange} error={errors.last_name} />
        </div>
        <div className="row">
          <Input name="username" type="text" value={log.username} label="Username" onChange={handleChange} error={errors.username} />
          <Input name="email" type="text" value={log.email} label="Email" onChange={handleChange} error={errors.email} />
        </div>
        <div className="row">
          {method === "POST" && <Input name="password" type="password" value={log.password} label="Password" onChange={handleChange} error={errors.password} />}
          <Checkbox name="is_active" label="Active" checked={log.is_active} onChange={handleChange} error={errors.is_active}/>
        </div>
        <div className="row"><h4 style={{margin: "20px 30px"}}>Permissions:</h4></div>
        <div className="row">
          <p>User management</p>
          <ul>
            <li>
              <Checkbox name="create_user" label="Create" checked={log.create_user} onChange={handleChange} error={errors.create_user}/>
            </li>
            <li>
              <Checkbox name="update_user" label="Update" checked={log.update_user} onChange={handleChange} error={errors.update_user}/>
            </li>
            <li>
              <Checkbox name="update_user" label="Update" checked={log.update_user} onChange={handleChange} error={errors.update_user}/>
            </li>
          </ul>
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

export default UsersForm;
