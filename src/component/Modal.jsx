import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInitials,
  setIsModalOpen,
  setCreatedGroups,
} from "../actions/index";
import styles from "./Modal.module.css";

const Modal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const initials = useSelector((state) => state.initials);
  const isMobileView = useSelector((state) => state.isMobileView);
  const createdGroups = useSelector((state) => state.createdGroups);
  const [groupName, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const storedGroups = localStorage.getItem("createdGroups");
    if (storedGroups) {
      dispatch(setCreatedGroups(JSON.parse(storedGroups)));
    }
  }, [dispatch]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    const words = e.target.value.split(" ");
    let newInitials = "";

    if (words.length > 0 && words[0].length > 0) {
      newInitials += words[0][0];
    }
    if (words.length > 1 && words[1].length > 1) {
      newInitials += words[1][0];
    }
    dispatch(setInitials(newInitials));
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setErrorMessage("");
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setErrorMessage("Group name cannot be empty.");
      return;
    }
    if (!selectedColor) {
      setErrorMessage("You must choose a color.");
      return;
    }
    if (!Array.isArray(createdGroups)) {
      console.error("createdGroups is not an array:", createdGroups);
      return;
    }
    if (createdGroups.some((group) => group.name === groupName.trim())) {
      setErrorMessage("Group name must be unique.");
      return;
    }
    const newGroup = {
      name: groupName,
      initials,
      color: selectedColor,
    };
    const updatedGroups = [...createdGroups, newGroup];
    dispatch(setCreatedGroups(updatedGroups));
    localStorage.setItem("createdGroups", JSON.stringify(updatedGroups));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
    setSelectedColor("");
    setGroupName("");
    dispatch(setInitials(""));
    setErrorMessage("");
  };

  return (
    <div onClick={handleOverlayClick} className={styles.modalOverlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modalContent} ${
          isMobileView ? styles.modalContentMobile : ""
        }`}
      >
        <p
          className={`${styles.modalTitle} ${
            isMobileView ? styles.modalTitleMobile : ""
          }`}
        >
          Create New Notes Group
        </p>
        <div
          className={`${styles.formGroup} ${
            isMobileView ? styles.formGroupMobile : ""
          }`}
        >
          <p
            className={`${styles.label} ${
              isMobileView ? styles.labelMobile : ""
            }`}
          >
            Group Name
          </p>
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            placeholder="Enter your group name...."
            className={`${styles.input} ${
              isMobileView ? styles.inputMobile : ""
            }`}
          />
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div
          className={`${styles.formGroup} ${
            isMobileView ? styles.formGroupMobile : ""
          }`}
        >
          <p
            className={`${styles.label} ${
              isMobileView ? styles.labelMobile : ""
            }`}
          >
            Choose Colour
          </p>
          <div className={styles.colorPicker}>
            {[
              "#B38BFA",
              "#FF79F2",
              "#43E6FC",
              "#F19576",
              "#0047FF",
              "#6691FF",
            ].map((color) => (
              <div
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`${styles.colorOption} ${
                  isMobileView ? styles.colorOptionMobile : ""
                } ${selectedColor === color ? styles.colorSelected : ""}`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <div
          className={`${styles.buttonContainer} ${
            isMobileView ? styles.buttonContainerMobile : ""
          }`}
        >
          <button
            onClick={handleCreateGroup}
            className={`${styles.button} ${
              isMobileView ? styles.buttonMobile : ""
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
