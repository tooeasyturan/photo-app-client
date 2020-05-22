/** @format */

import React from "react";
import uuid from "uuid/v4";
import { Image } from "semantic-ui-react";

const ImageGroupStyles = { marginTop: 100, textAlign: "center" };

const PortfolioPictures = ({
  portfolioPictures,
  handleDeletePortfolioPicture,
  isLoggedInUser,
}) => {
  const displayPortfolioPictures = portfolioPictures.map((img) => {
    return (
      <Image
        key={uuid()}
        src={isLoggedInUser ? img : img.portfolio}
        wrapped
        ui={true}
        alt=''
        rounded
        style={{ cursor: "pointer", margin: "0.5em" }}
        onClick={
          isLoggedInUser ? () => handleDeletePortfolioPicture(img) : null
        }
      />
    );
  });

  return (
    <Image.Group
      style={ImageGroupStyles}
      doubling='true'
      stackable='true'
      size='large'
    >
      {displayPortfolioPictures}
    </Image.Group>
  );
};

export default PortfolioPictures;
