/** @format */

import React from "react";
import { Image, Container, Card } from "semantic-ui-react";
import SendMessage from "../src/components/messaging/SendMessage";
import UserCard from "../src/components/profiles/UserCard";

const ImageGroupStyles = { marginTop: 100, textAlign: "center" };

const FullProfileView = ({ profile, displayPortfolioPictures, username }) => {
  const { info, avatar } = profile;
  console.log(profile);

  return (
    <>
      <UserCard
        profile={profile}
        isFullProfile
        sendMessage={<SendMessage userTo={username} />}
      />
      <Image.Group
        style={ImageGroupStyles}
        doubling='true'
        stackable='true'
        size='large'
      >
        {displayPortfolioPictures}
      </Image.Group>
    </>
  );
};

export default FullProfileView;
