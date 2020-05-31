/** @format */

export const GetToken = (): string | undefined => {
  const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
  return user ? user : undefined;
};

export const SetUser = (userData: {}): void => {
  window.localStorage.setItem("loggedInUser", JSON.stringify(userData));
};
