/** @format */

import React, { useState, useEffect } from "react";
import usersService from "../../services/users";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard";

interface IProfiles {
  id: string;
  avatar: string;
  username: string;
  profile: {
    country: string;
    region: string;
    description: string;
  };
}

const Profiles = () => {
  const [profiles, setProfiles] = useState<IProfiles[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    console.log("fetching profiles");
    const profiles: Array<IProfiles> = await usersService.getAll();
    console.log(profiles);
    setProfiles(profiles);
  };

  const displayProfiles = profiles.map((profile) => {
    // Only display profiles if a user profile has been created
    if (Object.entries(profile.profile).length > 0) {
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
