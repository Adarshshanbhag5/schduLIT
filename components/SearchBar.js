import React, { useState } from "react";
import { closedData, onGoingData } from "../data";
import styles from "../styles/SearchBar.module.css";
import Card from "./Card";

export default function SearchBar({ input, handler }) {
  return (
    <>
      <section className={styles.search__container}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Select an event"
          value={input}
          onChange={handler}
        />
      </section>
    </>
  );
}
