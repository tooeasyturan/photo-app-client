/** @format */

interface UserData {
  id: string;
  token: string;
  status: string;
  username: string;
}

export const getToken = (): string | undefined => {
  const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
  return user ? user.token : undefined;
};

export const setUser = (userData: UserData): void => {
  window.localStorage.setItem("loggedInUser", JSON.stringify(userData));
};

export const getUsername = (): string | undefined => {
  const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
  return user ? user.username : undefined;
};
