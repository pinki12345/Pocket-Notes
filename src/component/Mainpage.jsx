import React from "react";
import img from "../assets/main.png";
import styles from "./Mainpage.module.css";

const Mainpage = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={img} alt="Home page" className={styles.mainImage} />
      <h1 className={styles.mainTitle}>Pocket Notes</h1>
      <p className={styles.mainDescription}>
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
    </div>
  );
};

export default Mainpage;
