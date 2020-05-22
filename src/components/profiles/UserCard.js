/** @format */

import React from "react";
import { Container, Card, Image } from "semantic-ui-react";

const CardStyles = { marginTop: 100 };

const UserCard = ({ profile, isFullProfile, ...children }) => {
  const { username, firstName, lastName, email } = profile;
  const { avatar } = isFullProfile ? profile : profile.avatar[0];
  const { country, region, description } = isFullProfile
    ? profile.profile
    : profile.profile[0];

  window.profile = profile;

  return (
    <Card
      className='ui centered card'
      href={!isFullProfile ? `/profile/${username}` : null}
      style={CardStyles}
    >
      <Image key={avatar} src={avatar} alt='' />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>
          <p>{`Location: ${country} ${region}`}</p>
          {isFullProfile ? (
            <>
              <p>{firstName + " " + lastName}</p>
              <p>{email}</p>
            </>
          ) : (
            <p>{`Description: ${description}`}</p>
          )}
        </Card.Description>
        {isFullProfile &&
          Object.keys(children).map((childKey) => children[childKey])}
      </Card.Content>
    </Card>
  );
};

export default UserCard;
