import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useRequest from "../../../hooks/useRequest";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";
import Loading from "../../common/Loading";

const USERS_URL = "/api/users/";

const Users = () => {
  const { data, getData, isLoading } = useRequest(USERS_URL);

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

  const handleEdit = (handle) => {
    setEdit(handle);
    setMethod("PUT");
    setFormOpen(true);
  };



  return (
    <div className="page-container">
      <div className="row">
        <h1>Users</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New User
        </button>
      </div>
      {
        isLoading ? <Loading /> :
        <div className="table-container">
          <UsersTable users={data} handleEdit={handleEdit} />
        </div>
      }
      <AnimatePresence initial={false}>
        {formOpen && <UsersForm closeForm={closeForm} method={method} edit={edit} />}
      </AnimatePresence>
    </div>
  );
};

export default Users;
