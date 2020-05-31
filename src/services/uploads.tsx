/** @format */

import { apiRequestWithToken, apiRequest } from "./apiRequest";
const uploadsUrl = "uploads";

const getImages = async (url: string): Promise<string[] | undefined> => {
  const res = await apiRequest(`${uploadsUrl}/${url}`, "get");
  return res.data;
};

const uploadPicture = async (formData: {}): Promise<string | undefined> => {
  const res = await apiRequestWithToken(uploadsUrl, "post", formData);
  return res.data.url;
};

const uploadAvatar = async (formData: {}): Promise<string | undefined> => {
  const res = await apiRequestWithToken(
    `${uploadsUrl}/avatar`,
    "post",
    formData
  );
  return res.data.url;
};

const deletePortfolioPicture = async (imageToDelete: string) => {
  await apiRequestWithToken(uploadsUrl, "delete", {
    imageToDelete,
  });
};

export default {
  getImages,
  uploadPicture,
  deletePortfolioPicture,
  uploadAvatar,
};
