/** @format */

import { useState } from "react";
import uploadsService from "../../services/uploads";

const useFetchImages = (user, isAvatar, avatarFile, setIsUpdated) => {
  const [portfolioPictures, setPortfolioPictures] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPortfolioPictures = async () => {
    const portfolioPictures = await uploadsService.getImages(
      `uploads/${user.username ? user.username : user}`
    );
    setPortfolioPictures(portfolioPictures);
  };

  const fetchAvatar = async (username) => {
    username = user ? user.username : username;
    const avatar = await uploadsService.getImages(`uploads/${username}/avatar`);
    console.log("fetchd avatar", avatar);
    setAvatar(avatar);
  };

  const uploadImage = async (formData) => {
    setIsLoading(true);
    if (!isAvatar) {
      const upload = await uploadsService.uploadImage(formData, user.token);
      setPortfolioPictures([...portfolioPictures, upload]);
    } else if (isAvatar) {
      const upload = await uploadsService.uploadAvatar(formData, user.token);
      setAvatar(upload);
      setIsUpdated(true);
    }
    setIsLoading(false);
  };

  const handleChange = async (e) => {
    const file = e.target.files ? e.target.files[0] : avatarFile;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", user.username);
    formData.append("folder", "userimg");
    try {
      uploadImage(formData);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleDeletePortfolioPicture = async (imageToDelete) => {
    // PROBABLY BETTER TO SEND NAME OF IMAGE TO BE DELETED WITH REQUEST URL PARAMS
    // *** Uploads are retrieved directly from file, not through db. Need to query db for portfolio id.
    // *** maybe portfolioPictures should be saved using portfolio id.

    if (window.confirm("Are you sure you want to delete this image")) {
      await uploadsService.deletePortfolioPicture(imageToDelete);
      const updatedPortfolioPictures = portfolioPictures.filter(
        (image) => image !== imageToDelete
      );
      setPortfolioPictures(updatedPortfolioPictures);
    } else {
      console.log("image not deleted");
    }
  };

  return {
    handleChange,
    handleDeletePortfolioPicture,
    fetchPortfolioPictures,
    fetchAvatar,
    portfolioPictures,
    avatar,
    isLoading,
  };
};

export default useFetchImages;
