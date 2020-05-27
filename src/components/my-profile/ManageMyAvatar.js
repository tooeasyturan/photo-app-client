/** @format */

import React, { useState, useEffect } from "react";
import useImageHandling from "../custom-hooks/useImageHandling";
import { Button, Image, Popup, Loader } from "semantic-ui-react";

const ManageMyAvatar = ({ user }) => {
  const [file, setFile] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [preview, setPreview] = useState();
  const { handleChange, isLoading } = useImageHandling(
    user,
    true,
    file,
    setIsUpdated
  );

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
    setIsUpdated(false);
  };

  return (
    <>
      <div>
        <input
          type='file'
          id='avatarInput'
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <Popup
          trigger={
            <label htmlFor='avatarInput'>
              {!user.avatar && !preview ? (
                <Image
                  src={
                    "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
                  }
                  alt='asdf'
                  size='medium'
                  rounded
                  centered
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <Image
                  src={!file ? user.avatar : preview}
                  alt='asdf'
                  size='huge'
                  rounded
                  centered
                  style={{ cursor: "pointer" }}
                />
              )}
            </label>
          }
        >
          <Popup.Header>Click image to change avatar</Popup.Header>
        </Popup>
      </div>
      <br></br>
      {/* <button onClick={() => setFile(null)}>Reset</button> */}
      {file && isUpdated === false ? (
        <Button
          style={isLoading ? { background: "none" } : { background: "red" }}
          fluid
          size='medium'
          type='submit'
          onClick={handleChange}
        >
          {isLoading === true ? (
            <Loader incline active />
          ) : (
            "Confirm avatar change"
          )}
        </Button>
      ) : null}
    </>
  );
};

export default ManageMyAvatar;
