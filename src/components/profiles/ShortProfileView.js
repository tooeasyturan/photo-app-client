import React from "react";
import { Card, Image } from "semantic-ui-react";

const ShortProfileView = ({ profile }) => {
  // Really need to update db schema to have less confusing objects when fetching data
  console.log(profile);
  const avatar = profile.avatar[0].avatar;
  const username = profile.username;
  const { description, country, region } = profile.profile[0];

  return (
    <Card href={`/profile/${username}`} className="user">
      <Image
        src={avatar}
        alt="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>
          <p>{`Location: ${country} ${region}`}</p>
          <p>{`Description: ${description}`}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ShortProfileView;
