/** @format */

import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CardStyles = { marginTop: 100 };

interface Profile {
  avatar: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profile: {
    country: string;
    region: string;
    description: string;
  };
}

interface UserCardProps {
  profile: Profile;
  isFullProfile?: boolean;
  children?: any;
}

const UserCard = ({ profile, isFullProfile, ...children }: UserCardProps) => {
  const { username, firstName, lastName, email, avatar } = profile;
  const { country, region, description } = profile.profile;

  //Ask question about passing props that haven't been mapped (i.e. from FullProfile)

  return (
    <Card className='ui centered card' style={CardStyles} as='a'>
      <Image
        key={avatar}
        src={avatar}
        alt=''
        as={Link}
        to={!isFullProfile ? `/profiles/${username}` : null}
      />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>
          <p>{`Location: ${country} ${region}`}</p>
          {isFullProfile ? (
            <>
              <p>{firstName + " " + lastName}</p>
              <p>{email}</p>
              <p>{`Description: ${description}`}</p>
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
