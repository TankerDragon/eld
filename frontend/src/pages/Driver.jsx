import React from "react";
import { useParams } from "react-router-dom";

function Driver({ match }) {
  let params = useParams();

  return (
    <div>
      <h1>{params.id}</h1>
      <div>Driver</div>
    </div>
  );
}

export default Driver;
