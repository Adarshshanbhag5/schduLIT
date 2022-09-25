import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../loaders/Spinner";
import styles from "../styles/Login.module.css";

export default function Signup() {
  const emailRef = useRef();
  const emailCnfRef = useRef();
  const passwordRef = useRef();
  const passwordCnfRef = useRef();
  const nameRef = useRef();
  const route = useRouter();
  const { signUp, loading } = useAuthContext();

  async function submitHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const emailCnf = emailCnfRef.current.value;
    const password = passwordRef.current.value;
    const passwordCnf = passwordCnfRef.current.value;
    const name = nameRef.current.value;

    if (email === emailCnf && password === passwordCnf) {
      await signUp(email, name, password);
      route.replace("/");
    } else {
      alert("Error occured...");
    }
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.signUp__container}>
      <div className={styles.form__container}>
        <h1>Signup</h1>
        <form id={styles.signUp__form} onSubmit={submitHandler}>
          <button className="form-btn">Continue with Google</button>
          <div className={styles.or__line}>or</div>
          <div className={styles.manual__signUp__container}>
            <h2>Sign up with your email address</h2>
            <div className="email__div">
              <label htmlFor="email">What&apos;s your email?</label>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                ref={emailRef}
              />
            </div>
            <div className="emailCnf__div">
              <label htmlFor="emailCnf">Confirm your email</label>
              <input
                type="email"
                id="emailCnf"
                required
                placeholder="Enter your email again"
                ref={emailCnfRef}
              />
            </div>
            <div className="password__div">
              <label htmlFor="password">Create a password</label>
              <input
                type="password"
                id="password"
                required
                placeholder="Create a password"
                ref={passwordRef}
              />
            </div>
            <div className="passwordCnf__div">
              <label htmlFor="passwordCnf">Confirm your password</label>
              <input
                type="password"
                id="passwordCnf"
                required
                placeholder="Enter your password again"
                ref={passwordCnfRef}
              />
            </div>
            <div className="userName__div">
              <label htmlFor="userName">What should we call you?</label>
              <input
                type="text"
                id="userName"
                required
                placeholder="Enter a profile name"
                ref={nameRef}
              />
              <div>This appears on your profile</div>
            </div>
            <button onClick={submitHandler} className="form-btn">
              Sign up
            </button>
            <div className={styles.login__link}>
              Have an account? <Link href="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.img__container}>
        <img
          src="/assets/login_img.jpg"
          alt="login illustration"
          className={styles.img}
        />
      </div>
    </div>
  );
}
