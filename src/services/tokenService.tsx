/** @format */

export const getToken = (): string | undefined => {
  const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
  return user ? user.token : undefined;
};

export const setUser = (userData: {}): void => {
  window.localStorage.setItem("loggedInUser", JSON.stringify(userData));
};
