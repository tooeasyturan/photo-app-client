/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import useImageHandling from "../custom-hooks/useImageHandling";

// Maps through each user in Convo (conversation) and gets their avatar

const ConvoAvatar = ({ user }) => {
  const { fetchAvatar, avatar } = useImageHandling();

  useEffect(() => {
    fetchAvatar(user);
  }, []);

  return <Image avatar src={avatar} />;
};

export default ConvoAvatar;
