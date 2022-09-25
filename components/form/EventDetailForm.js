import React, { useRef, useState } from "react";
import styles from "../../styles/EventDetailForm.module.css";

export default function EventDetailForm({
  formData,
  setFormData,
  stepHandler,
}) {
  const [validForm, setValidForm] = useState(false);
  const regexRef = useRef({
    event_title: /^([\w]{3,})+(\s+([\w\s]{1,})+)?$/i,
  });
  function inputHandler(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  }
  function formValidation(field, regex) {
    if (regex.test(field.value)) {
      field.className = "valid__formfield";
      setValidForm(true);
    } else {
      field.className = "invalid__formfield";
      setValidForm(false);
    }
  }

  function keyUpHandler(e) {
    formValidation(e.target, regexRef.current[e.target.id]);
  }

  function submitHandler(e) {
    e.preventDefault();

    if (
      formData.event_title === "" ||
      formData.event_venue === "" ||
      formData.event_price === ""
    ) {
      alert("Please fill the form correctly!");
    } else {
      stepHandler(true);
    }
  }
  return (
    <form action="#" className={styles.form} onSubmit={submitHandler}>
      <div className={styles.event__title__div}>
        <label htmlFor="event_title">
          <span>Event title/name</span>
          <span className="field--required">&#42;</span>
        </label>
        <input
          type="text"
          id="event_title"
          required
          onKeyUp={keyUpHandler}
          value={formData.event_title}
          onChange={inputHandler}
        />
        <p className="validation__info">
          Event title must contain atleast 3 characters
        </p>
      </div>
      <div className={styles.group__container}>
        <div className={styles.group__left}>
          <div className={styles.event__type__div}>
            <label htmlFor="event_type">
              <span>Event type</span>
              <span className="field--required">&#42;</span>
            </label>
            <select
              name="event_type"
              id="event_type"
              className={styles.event__select}
              value={formData.event_type}
              onChange={inputHandler}
            >
              <option value="education">Education</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
              <option value="charity">Charity</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles.event__date__div}>
            <label htmlFor="event_date">Event date</label>
            <input
              type="date"
              id="event_date"
              value={formData.event_date}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.event__time__div}>
            <label htmlFor="event_time">Event time</label>
            <input
              type="time"
              id="event_time"
              value={formData.event_time}
              onChange={inputHandler}
            />
          </div>
        </div>
        <div className={styles.event__banner__div}>
          <label htmlFor="event_banner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 0 24 24"
              width="28px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
            <p>{"Event banner/image (if available)"}</p>
          </label>
          <input type="file" accept="image/*" id="event_banner" />
        </div>
      </div>
      <div className={styles.event__venue__div}>
        <label htmlFor="event_venue">
          <span>Event venue</span>
          <span className="field--required">&#42;</span>
        </label>
        <textarea
          name="event_venue"
          id="event_venue"
          cols="30"
          rows="3"
          className={styles.textarea}
          value={formData.event_venue}
          onChange={inputHandler}
          required
        ></textarea>
      </div>
      <div className={styles.event__price__div}>
        <label htmlFor="event_price">
          <span>Event fees</span>
          <span className="field--required">&#42;</span>
        </label>
        <input
          type="number"
          id="event_price"
          value={formData.event_price}
          onChange={inputHandler}
          required
        />
      </div>
      <div className={styles.btn__container}>
        <button
          type="submit"
          className="form-btn"
          disabled={!validForm}
          onClick={submitHandler}
        >
          Next
        </button>
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
      </div>
    </form>
  );
}
