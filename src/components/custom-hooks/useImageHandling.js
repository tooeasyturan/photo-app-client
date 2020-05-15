import { useState } from "react";
import uploadsService from "../../services/uploads";

const useFetchImages = (user, isAvatar, avatarFile, setIsUpdated) => {
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async () => {
    await uploadsService
      .getImages(`uploads/${user.username ? user.username : user}`)
      .then((pics) => setImages(pics));
  };

  const fetchAvatar = async () => {
    await uploadsService
      .getImages(`uploads/${user.username}/avatar`)
      .then((pics) => setAvatar(pics[0]));
  };

  const uploadImage = async (formData) => {
    setIsLoading(true);
    if (!isAvatar) {
      const upload = await uploadsService.uploadImage(formData, user.token);
      setImages([...images, upload.url]);
    } else if (isAvatar) {
      const upload = await uploadsService.uploadAvatar(formData, user.token);
      setAvatar(upload.url);
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

  const handleDeleteImage = async (imageToDelete) => {
    // PROBABLY BETTER TO SEND NAME OF IMAGE TO BE DELETED WITH REQUEST URL PARAMS
    // *** Uploads are retrieved directly from file, not through db. Need to query db for portfolio id.
    // *** maybe images should be saved using portfolio id.

    if (window.confirm("Are you sure you want to delete this image")) {
      await uploadsService.deleteImage(user.token, imageToDelete);
      const updatedImages = images.filter((image) => image !== imageToDelete);
      setImages(updatedImages);
    } else {
      console.log("image not deleted");
    }
  };

  return {
    handleChange,
    handleDeleteImage,
    fetchImages,
    fetchAvatar,
    images,
    avatar,
    isLoading,
  };
};

export default useFetchImages;
