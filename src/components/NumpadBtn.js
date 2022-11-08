import React from "react";

const NumpadBtn = ({ label, handleChange }) => {
  return (
    <div className="btnNumpad" onClick={() => handleChange(label)}>
      {label}
    </div>
  );
};

export default NumpadBtn;
