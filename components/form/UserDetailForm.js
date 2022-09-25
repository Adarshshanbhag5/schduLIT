import React, { useRef, useState } from "react";
import styles from "../../styles/UserDetailForm.module.css";

export default function UserDetailForm({ formData, setFormData, stepHandler }) {
  const [validForm, setValidForm] = useState(false);
  const regexRef = useRef({
    userName: /^([\w]{3,})+(\s+([\w\s]{1,})+)?$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    phone: /^\d{10}$/,
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
      formData.userName === "" ||
      formData.email === "" ||
      formData.phone === ""
    ) {
      alert("Please fill the form correctly!");
    } else {
      stepHandler(true);
    }
  }

  return (
    <form
      // action="#"
      className={styles.form}
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div className={styles.name__div}>
        <label htmlFor="userName">
          Name of organiser <span className="field--required">&#42;</span>
        </label>
        <input
          type="text"
          id="userName"
          value={formData.userName}
          onChange={inputHandler}
          onKeyUp={keyUpHandler}
          placeholder="Name"
          required
        />
        <p className="validation__info">
          Name must contain atleast 3 characters
        </p>
      </div>
      <div className={styles.email__ph__container}>
        <div className={styles.email__div}>
          <label htmlFor="email">
            Email <span className="field--required">&#42;</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={inputHandler}
            onKeyUp={keyUpHandler}
            placeholder="Email id"
            required
          />
          <p className="validation__info">Email must be valid address</p>
        </div>
        <div className={styles.phone__div}>
          <label htmlFor="phone">
            Phone number <span className="field--required">&#42;</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={inputHandler}
            onKeyUp={keyUpHandler}
            placeholder="Phone number"
            required
          />
          <p className="validation__info">
            Phone must be valid India phone number
          </p>
        </div>
      </div>
      <button
        className="form-btn"
        disabled={!validForm}
        onClick={submitHandler}
        type="submit"
      >
        Next step
      </button>
    </form>
  );
}
