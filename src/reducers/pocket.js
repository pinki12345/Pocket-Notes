import {
    SET_IS_MOBILE_VIEW,
    SET_SELECTED_GROUP,
    SET_SHOW_SELECTED_GROUP_DATA,
    SET_DISPLAY_TEXT,
    SET_INITIALS,
    SET_IS_MODAL_OPEN,
    SET_CREATED_GROUPS,
  } from '../actions/index';
  
  const initialState = {
    isMobileView: false,
    selectedGroup: null,
    showSelectedGroupData: false,
    displayText: "",
    isModalOpen: false,
    initials: "",
    createdGroups:[],
  };
  
  const reducer = (state = initialState, action) => {
    console.log("Payload", action.payload);
    switch (action.type) {
      case SET_IS_MOBILE_VIEW:
        return { ...state, isMobileView: action.payload };
      case SET_SELECTED_GROUP:
        return { ...state, selectedGroup: action.payload };
      case SET_SHOW_SELECTED_GROUP_DATA:
        return { ...state, showSelectedGroupData: action.payload };
      case SET_DISPLAY_TEXT:
        return { ...state, displayText: action.payload };
      case SET_IS_MODAL_OPEN:
        return { ...state, isModalOpen: action.payload };
      case SET_INITIALS:
        return { ...state, initials: action.payload };
      case SET_CREATED_GROUPS:
        return { ...state, createdGroups: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
  