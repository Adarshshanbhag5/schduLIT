import React, { useState } from "react";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import { useFirestoreContext } from "../../context/FirestoreContext";
import Spinner from "../../loaders/Spinner";
import styles from "../../styles/Home.module.css";

export default function Index() {
  const [input, setInput] = useState("");
  function inputhandler(e) {
    setInput(e.target.value);
  }
  const { data, loading } = useFirestoreContext();
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <SearchBar input={input} handler={inputhandler} />
      <section className={styles.ongoing__event__container}>
        <div className={styles.ongoing__event__head}>All events</div>
        <div className={styles.events__grid}>
          {data?.map((item, index) => (
            <Card
              title={item.event_title}
              date={item.event_start_date}
              time={item.event_start_time}
              img={item.event_banner}
              key={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
