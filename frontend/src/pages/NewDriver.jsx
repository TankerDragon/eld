import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function NewDriver({ history }) {
  const [driver, setDriver] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    profile: {
      cdl_number: "",
      cdl_state: "AK",
      vehicle: null,
      co_driver: null,
      phone: "",
      address: "",
      notes: "",
    },
  });
  const navigate = useNavigate();

  const updateData = (obj, value, is_profile) => {
    if (is_profile) {
      let profile = driver["profile"];
      profile[obj] = value;
      setDriver({ ...driver, ["profile"]: profile });
    } else {
      setDriver({ ...driver, [obj]: value });
    }
  };

  const postNewDriver = async () => {
    const response = await fetch(`/api/drivers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 200) {
      navigate("/drivers");
    } else {
      window.alert(response.statusText);
    }

    // setDrivers(data);
  };

  const redirectBack = () => {
    navigate("/drivers");
  };

  const handleSubmit = () => {
    console.log(driver);
    postNewDriver();
  };

  return (
    <Container>
      <Row>
        <h1>New Driver</h1>
      </Row>
      <Row>
        <InputField>
          <label>First name*</label>
          <input onChange={(e) => updateData("first_name", e.target.value, false)} type="text" value={driver.first_name} />
        </InputField>
        <InputField>
          <label>Last name*</label>
          <input onChange={(e) => updateData("last_name", e.target.value, false)} type="text" value={driver.last_name} />
        </InputField>
        <InputField>
          <label>Username*</label>
          <input onChange={(e) => updateData("username", e.target.value, false)} type="text" value={driver.username} />
        </InputField>
        <InputField>
          <label>Email*</label>
          <input onChange={(e) => updateData("email", e.target.value, false)} type="text" value={driver.email} />
        </InputField>
      </Row>
      <Row>
        <InputField>
          <label>Password*</label>
          <input onChange={(e) => updateData("password", e.target.value, false)} type="password" value={driver.password} />
        </InputField>
        <InputField>
          <label>Vehicle</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </InputField>
        <InputField>
          <label>Driver's license No*</label>
          <input onChange={(e) => updateData("cdl_number", e.target.value, true)} type="text" value={driver.profile.cdl_number} />
        </InputField>
        <InputField>
          <label>Driver's License Issuing State*</label>
          <select name="states" id="select-states" onChange={(e) => updateData("cdl_state", e.target.value, true)} value={driver.profile.cdl_state}>
            <option value="AK">Alaska</option>
            <option value="AL">Alabama</option>
            <option value="AR">Arkansas</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="IA">Iowa</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="MA">Massachusetts</option>
            <option value="MD">Maryland</option>
            <option value="ME">Maine</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MO">Missouri</option>
            <option value="MS">Mississippi</option>
            <option value="MT">Montana</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="NE">Nebraska</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VA">Virginia</option>
            <option value="VT">Vermont</option>
            <option value="WA">Washington</option>
            <option value="WI">Wisconsin</option>
            <option value="WV">West Virginia</option>
            <option value="WY">Wyoming</option>
          </select>
        </InputField>
      </Row>
      <Row>
        <InputField>
          <label>Co-Driver</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </InputField>
        <InputField>
          <label>Home Terminal Address</label>
          <input onChange={(e) => updateData("address", e.target.value, true)} type="text" value={driver.profile.address} />
        </InputField>
        <InputField>
          <label>Phone number</label>
          <input onChange={(e) => updateData("phone", e.target.value, true)} type="text" value={driver.profile.phone} />
        </InputField>

        <InputField>
          <label>Notes</label>
          <input onChange={(e) => updateData("notes", e.target.value, true)} type="text" value={driver.profile.notes} />
        </InputField>
      </Row>
      <Buttons>
        <div>
          <button onClick={redirectBack}>Cancel</button>
          <button onClick={handleSubmit}>OK</button>
        </div>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  background: lightseagreen;
  width: calc(100% - 40px);
  margin: auto;
  margin-top: 50px;
  min-height: 80vh;
  border-radius: 20px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    color: #1d1d1d;
  }
`;

const InputField = styled.div`
  margin-top: 30px;
  width: 300px;

  label {
    color: #4b4b4b;
    display: block;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  input,
  select {
    outline: none;
    width: 100%;
    font-size: 1rem;
    padding: 7px 10px;
    border-radius: 20px;
    border: 1px solid #4b4b4b;
  }
  select {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  div {
    width: 290px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    cursor: pointer;
    width: 135px;
    padding: 8px 0;
    border: 1px solid #4b4b4b;
    border-radius: 5px;
  }
`;

export default NewDriver;
