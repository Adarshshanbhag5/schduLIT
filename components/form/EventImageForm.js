import React from "react";
import styles from "../../styles/EventImageForm.module.css";
export default function EventImageForm({ formData, setFormData }) {
  function inputHandler(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.files[0],
    }));
  }
  return (
    <div className={styles.container}>
      <div className={styles.event__image__div}>
        <label htmlFor="event_banner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 0 24 24"
            width="32px"
            fill="rgb(169, 168, 179)"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
          </svg>
          <p className={styles.upload__text}>
            {"Event banner/image (if available)"}
          </p>
        </label>
        <input
          type="file"
          accept="image/*"
          id="event_banner"
          onChange={inputHandler}
        />
      </div>
    </div>
  );
}
