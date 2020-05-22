/** @format */

import React from "react";
import { Container, Card, Image } from "semantic-ui-react";

const CardStyles = { marginTop: 100 };

const UserCard = ({ profile, isFullProfile, ...children }) => {
  const { info, avatar } = profile;
  console.log("isFullProfile", isFullProfile);

  return (
    <Container>
      <Card className='ui centered card' style={CardStyles}>
        <Image key={avatar} src={avatar} alt='' />
        <Card.Content>
          <Card.Header>{info.username}</Card.Header>
          <Card.Description>
            <p>{`Location: ${profile.profile.country} ${profile.profile.region}`}</p>
            {isFullProfile ? (
              <>
                <p>{info.firstName + " " + info.lastName}</p>
                <p>{info.email}</p>
              </>
            ) : (
              <p>{`Description: ${profile.profile.description}`}</p>
            )}
          </Card.Description>
          {isFullProfile &&
            Object.keys(children).map((childKey) => children[childKey])}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default UserCard;
