/** @format */

import React from "react";
import { Card, Image } from "semantic-ui-react";

const CardStyles = { marginTop: 100 };

interface Profile {
  avatar: any;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: {
    country: string;
    region: string;
    description: string;
  };
}

interface Props {
  profile: Profile;
  isFullProfile: boolean;
  children: any;
}

const UserCard: React.FC<Props> = ({ profile, isFullProfile, ...children }) => {
  const { username, firstName, lastName, email } = profile;
  const { avatar } = isFullProfile ? profile : profile.avatar[0];
  const { country, region, description } = isFullProfile
    ? profile.profile
    : profile.profile[0];

  //Ask question about passing props that haven't been mapped (i.e. from FullProfile)

  return (
    <Card
      className='ui centered card'
      href={!isFullProfile ? `/profiles/${username}` : null}
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
