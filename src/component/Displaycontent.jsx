import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mainpage from "./Mainpage";
import btn from "../assets/btn.png";
import img from "../assets/arrowIcon.png";
import { setDisplayText, setShowSelectedGroupData } from "../actions/index";
import styles from "./Displaycontent.module.css";

const Displaycontent = () => {
  const dispatch = useDispatch();
  const [allTexts, setAllTexts] = useState([]);
  const isMobileView = useSelector((state) => state.isMobileView);
  const selectedGroup = useSelector((store) => store.selectedGroup);
  const showSelectedGroupData = useSelector(
    (store) => store.showSelectedGroupData
  );
  const displayText = useSelector((store) => store.displayText);

  useEffect(() => {
    const storedTexts = localStorage.getItem("allTexts");
    if (storedTexts) {
      setAllTexts(JSON.parse(storedTexts));
    }
  }, []);

  const handleInputChange = (e) => {
    dispatch(setDisplayText(e.target.value));
  };

  const handleShowText = () => {
    if (displayText.trim() && selectedGroup) {
      const newText = {
        text: displayText,
        timestamp: new Date(),
        groupId: selectedGroup.name,
      };
      const updatedTexts = [...allTexts, newText];
      setAllTexts(updatedTexts);
      localStorage.setItem("allTexts", JSON.stringify(updatedTexts));
      dispatch(setDisplayText(""));
    }
  };

  const formatTimestamp = (timestamp) => {
    const time = new Date(timestamp);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const date = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[monthIndex];

    let period = "AM";
    let adjustedHours = hours;

    if (hours >= 12) {
      period = "PM";
      adjustedHours = hours === 12 ? 12 : hours - 12;
    }

    return (
      <div>
        <div>{`${adjustedHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`}</div>
        <div>{`${date} ${monthName} ${year}`}</div>
      </div>
    );
  };

  return (
    <div
      className={`${
        isMobileView ? styles.mobilecontainer : styles.desktopcontainer
      }`}
    >
      {!isMobileView || showSelectedGroupData ? (
        <div className={styles.innerContainer}>
          {selectedGroup && showSelectedGroupData ? (
            <>
              <div className={styles.marginBottom}>
                <div className={styles.header}>
                  {isMobileView && (
                    <img
                      src={img}
                      alt="Back"
                      onClick={() => dispatch(setShowSelectedGroupData(false))}
                      className={styles.backIcon}
                      style={{
                        width: "6vw",
                        height: "2vh",
                        marginLeft: "3vw",
                      }}
                    />
                  )}
                  <div
                    className={styles.groupIcon}
                    style={{
                      width: isMobileView ? "3rem" : "48px",
                      height: isMobileView ? "3rem" : "48px",
                      borderRadius: "50%",
                      backgroundColor: selectedGroup.color,
                      marginRight: isMobileView ? "0.5rem" : "1rem",
                    }}
                  >
                    <p>{selectedGroup.initials}</p>
                  </div>
                  <h2 className={styles.groupName}>{selectedGroup.name}</h2>
                </div>
              </div>

              <div
                className={`${styles.content} ${
                  isMobileView ? styles.mobileContent : styles.desktopContent
                }`}
              >
                <div
                  style={{
                    padding: isMobileView ? "10px" : "20px",
                    marginTop: isMobileView ? "35px" : "30px",
                  }}
                >
                  {allTexts
                    .filter((item) => item.groupId === selectedGroup.name)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={`${styles.textItem} ${
                          isMobileView
                            ? styles.mobileTextItemMargin
                            : styles.textItemMargin
                        }`}
                      >
                        <div
                          className={
                            isMobileView
                              ? styles.mobileTimestamp
                              : styles.timestamp
                          }
                        >
                          {formatTimestamp(item.timestamp)}
                        </div>
                        <div className={styles.text}>{item.text}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div
                className={`${styles.footer} ${
                  isMobileView ? styles.mobileFooter : styles.desktopFooter
                }`}
              >
                <textarea
                  value={displayText}
                  onChange={handleInputChange}
                  placeholder="Enter your text here..........."
                  className={`${styles.textarea} ${
                    isMobileView
                      ? styles.mobileTextarea
                      : styles.desktopTextarea
                  } scroll-container`}
                />
                <img
                  src={btn}
                  alt="Icon"
                  onClick={handleShowText}
                  className={`${styles.sendIcon} ${
                    isMobileView
                      ? styles.mobileSendIcon
                      : styles.desktopSendIcon
                  }`}
                />
              </div>
            </>
          ) : (
            <div className={styles.mainPage}>
              <Mainpage />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Displaycontent;
