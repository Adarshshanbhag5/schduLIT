import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import styles from "../../styles/EventQuillForm.module.css";

const modules = {
  toolbar: [
    [
      { header: [1, 2, 3, 4, false] },

      { size: ["small", false, "large", "huge"] },
    ],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

export default function EventQuillForm({ formData, setFormData, stepHandler }) {
  const [validForm, setValidForm] = useState(true);
  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className={styles.editor__container}>
      <ReactQuill
        theme="snow"
        value={formData.quillValue}
        onChange={(e) => {
          setFormData((prevData) => ({ ...prevData, quillValue: e }));
        }}
        modules={modules}
      />
      <div className={styles.btn__container}>
        <button
          className="form-btn"
          onClick={(e) => {
            e.preventDefault();
            stepHandler(false);
          }}
          style={{ backgroundColor: "#fc4f43" }}
        >
          Previous
        </button>
        <button
          className="form-btn"
          disabled={!validForm}
          onClick={submitHandler}
        >
          {"Confirm & Submit"}
        </button>
      </div>
    </div>
  );
}
