import React from "react";
import formimage from "../../src/images/forms_2020q4_48dp.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header_info">
        <img
          src={formimage}
          className="form_image"
          alt="form-img"
        />
        <div className="info">Form Builder</div>
      </div>
    </div>
  );
}

export default Header;
