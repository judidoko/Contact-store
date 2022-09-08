import React from "react";
import LoadingImg from "../../assets/Images/spinner-icon.gif";

const Spinner = () => {
  return (
    <>
      <div>
        <img
          src={LoadingImg}
          alt=""
          className="d-flex m-auto"
          style={{ width: "200px" }}
        />
      </div>
    </>
  );
};

export default Spinner;
