import React from "react";
import form_image from "../../src/images/google-forms-new-logo-1.png";
import { IoMdFolderOpen } from "react-icons/io";
import { useStateValue } from "../StateProvider";

const Formheader = () => {
  const [{ doc_name }] = useStateValue();

  return (
    <>
      <div className="form_header">
        <div className="form_header_left">
          <img src={form_image} alt="form-img" />
          <input
            type="text"
            placeholder="Untitled form"
            className="form_name"
            value={doc_name}
            disabled
          ></input>
          <IoMdFolderOpen className="form_header_icon"></IoMdFolderOpen>
        </div>
      </div>

    </>
  );
}

export default Formheader;
