import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedGroup,
  setDisplayText,
  setShowSelectedGroupData,
  setIsModalOpen,
  setCreatedGroups,
} from "../actions/index";
import Modal from "./Modal";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isMobileView = useSelector((store) => store.isMobileView);
  const selectedGroup = useSelector((store) => store.selectedGroup);
  const showSelectedGroupData = useSelector(
    (store) => store.showSelectedGroupData
  );
  const createdGroups = useSelector((store) => store.createdGroups);
  const isModalOpen = useSelector((store) => store.isModalOpen);

  useEffect(() => {
    const storedGroups = localStorage.getItem("createdGroups");
    if (storedGroups) {
      dispatch(setCreatedGroups(JSON.parse(storedGroups)));
    }
  }, [dispatch]);

  const handleOpenModal = () => {
    console.log("Open modal");
    dispatch(setIsModalOpen(true));
    console.log("Modal opened", isModalOpen);
  };

  const handleGroupClick = (group) => {
    console.log("handleGroupClick");
    if (selectedGroup === group) {
      console.log("handleGroupClick");
      dispatch(setShowSelectedGroupData(!showSelectedGroupData));
    } else {
      console.log("handleGroupClick-else");
      dispatch(setSelectedGroup(group));
      dispatch(setShowSelectedGroupData(true));
      dispatch(setDisplayText(""));
    }
  };

  return (
    <div className={styles.container}>
      {!isMobileView || !showSelectedGroupData ? (
        <div className={styles.sidebarFirst}>
          <div className={styles.sidebarSecond}>
            <p className={styles.title}>Pocket Notes</p>
            <button className={styles.button} onClick={handleOpenModal}>
              <p className={styles.plus}>+</p>
              <p>Create Notes group</p>
            </button>
          </div>

          <div className={`${styles.scrollContainer} scroll-container`}>
            {Array.isArray(createdGroups) &&
              createdGroups.map((group, index) => (
                <div
                  key={index}
                  className={styles.groupItem}
                  style={{
                    backgroundColor:
                      selectedGroup &&
                      showSelectedGroupData &&
                      selectedGroup.name === group.name
                        ? "#F7ECDC"
                        : "transparent",
                  }}
                  onClick={() => handleGroupClick(group)}
                >
                  <div
                    className={styles.groupIcon}
                    style={{
                      backgroundColor: group.color,
                      color: group.color === "#FFFFFF" ? "gray" : "#fff",
                      border:
                        group.color === "#FFFFFF" ? "1px solid gray" : "none",
                    }}
                  >
                    {group.initials}
                  </div>
                  <p className={styles.groupText}>{group.name}</p>
                </div>
              ))}
          </div>
        </div>
      ) : null}

      {isModalOpen && <Modal />}
    </div>
  );
};

export default Sidebar;
