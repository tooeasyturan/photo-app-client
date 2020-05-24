/** @format */

import React, { useState, useEffect } from "react";
import usersService from "../../services/users";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const profiles = await usersService.getAll();
    console.log(profiles);
    const mappedProfiles = profiles.map(({ id, avatar, username, profile }) => {
      return { id, avatar, username, profile };
    });
    setProfiles(mappedProfiles);
  };

  console.log(profiles);

  const displayProfiles = profiles.map((profile) => {
    // Only display profiles if a user profile has been created
    if (profile.profile.length > 0) {
      return <UserCard profile={profile} key={profile.id} />;
    }
  });

  return (
    <div style={{ marginTop: 200 }}>
      <h1 style={{ textAlign: "center" }}>Explore Users</h1>
      <Card.Group
        className='doubling stackable'
        itemsPerRow={6}
        style={{ marginTop: 10 }}
        centered
      >
        {profiles.length === 0 ? <div></div> : displayProfiles}
      </Card.Group>
    </div>
  );
};

export default Profiles;
