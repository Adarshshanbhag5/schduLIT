import { useState } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import data, { closedData, onGoingData } from "../data";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  function inputhandler(e) {
    setInput(e.target.value);
  }
  return (
    <>
      <SearchBar input={input} handler={inputhandler} />
      <section className={styles.ongoing__event__container}>
        <div className={styles.ongoing__event__head}>
          Upcomming/Ongoing events
        </div>
        <div className={styles.events__grid}>
          {onGoingData.map((item, index) => (
            <Card
              title={item.title}
              date={item.date}
              time={item.time}
              img={item.img}
              featured={item.featured}
              closed={false}
              key={index}
            />
          ))}
        </div>
      </section>
      <section className={styles.ongoing__event__container}>
        <div className={styles.ongoing__event__head}>closed events</div>
        <div className={styles.events__grid}>
          {closedData
            .filter((val) => {
              if (input === "") {
                return val;
              } else if (
                val.title
                  .toLocaleLowerCase()
                  .includes(input.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .map((item, index) => (
              <Card
                title={item.title}
                date={item.date}
                time={item.time}
                img={item.img}
                closed={true}
                key={index}
              />
            ))}
        </div>
      </section>
    </>
  );
}
