import React from "react";
import { useHistory } from "react-router-dom";

const Templates = () => {
  const history = useHistory();
  const createform = () => {
    history.push("/home");
  }
  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <p>Start a new form</p>
        </div>
        <div className="template_right">
          <div className="card" onClick={createform}>
            <p className="title">Create New Form</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Templates;
