import React from "react";
import { Image, Container, Card } from "semantic-ui-react";
import SendMessage from "../SendMessage";

const CardStyles = { marginTop: 100 };
const ImageGroupStyles = { marginTop: 100, textAlign: "center" };

const FullProfileView = ({ profile, displayPortfolioPictures, username }) => {
  const { info, avatar } = profile;

  return (
    <>
      <Container>
        <Card className="ui centered card" style={CardStyles}>
          <Image key={avatar} src={avatar} alt="" />
          <Card.Content>
            <p>{info.username}</p>
            <p>{profile.profile.country + " " + profile.profile.region}</p>
            <p>{info.firstName + " " + info.lastName}</p>
            <p>{info.email}</p>
            <SendMessage userTo={username} />
          </Card.Content>
        </Card>
      </Container>
      <Image.Group
        style={ImageGroupStyles}
        doubling="true"
        stackable="true"
        size="large"
      >
        {displayPortfolioPictures}
      </Image.Group>
    </>
  );
};

export default FullProfileView;
