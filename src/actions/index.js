export const SET_IS_MOBILE_VIEW = "isMobileView";
export const SET_SELECTED_GROUP = "selectedGroup";
export const SET_SHOW_SELECTED_GROUP_DATA = "showSelectedGroupData";
export const SET_DISPLAY_TEXT = "displayText";
export const SET_INITIALS = "initials";
export const SET_IS_MODAL_OPEN = "setIsModalOpen";
export const SET_CREATED_GROUPS = "createdGroups";

export const setIsMobileView = (payload) => ({
  type: SET_IS_MOBILE_VIEW,
  payload,
});

export const setSelectedGroup = (payload) => ({
  type: SET_SELECTED_GROUP,
  payload,
});

export const setShowSelectedGroupData = (payload) => ({
  type: SET_SHOW_SELECTED_GROUP_DATA,
  payload,
});

export const setDisplayText = (payload) => ({
  type: SET_DISPLAY_TEXT,
  payload,
});

export const setIsModalOpen = (payload) => ({
  type: SET_IS_MODAL_OPEN,
  payload,
});

export const setInitials = (payload) => ({
  type: SET_INITIALS,
  payload,
});

export const setCreatedGroups = (payload) => ({
  type: SET_CREATED_GROUPS,
  payload,
});
