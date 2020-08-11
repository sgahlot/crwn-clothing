import USER_VALS from "../reducer-const";

export const setCurrentUser = user => ({
  type: USER_VALS.SET_CURRENT,
  payload: user
})