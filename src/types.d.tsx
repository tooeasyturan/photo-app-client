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
};

export type FullUserProfile = {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  status: String;
  date: string;
  profile: UserProfile;
  upload: Upload;
  id: string;
};

export type Upload = {
  id: string;
  portfolio: string;
  user: string;
};

export type ShortProfiles = {
  id: string;
  avatar: string;
  username: string;
  status: string;
  profile: {
    country: string;
    region: string;
    description: string;
  };
};

export type NewUser = {
  date: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  upload: [];
  username: string;
};
