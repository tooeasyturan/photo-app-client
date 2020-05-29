/** @format */

export type MyProfile = {
  country: string;
  desccription: string;
  region: string;
  shootingStyle: string[];
};

export type User = {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  date: string;
};

export type UserProfile = {
  country: string;
  descriptin: string;
  id: string;
  regions: string;
  shootingStyle: string[];
  user: string;
  status: string;
};

export type Upload = {
  id: string;
  portfolio: string;
  user: string;
};
