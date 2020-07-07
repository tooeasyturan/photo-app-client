/** @format */

import React, { useState, useEffect } from "react";
import usersService from "../../services/users";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard";
import { ShortProfiles } from "../../types.d";
import FilterProfiles from "./FilterProfiles";

const Profiles = (props) => {
  const [profiles, setProfiles] = useState<ShortProfiles[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [showFilteredProfiles, setShowFilteredProfiles] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const profiles: ShortProfiles[] = await usersService.getAllUsers();
    setProfiles(profiles);
  };

  const profilesToShow = showFilteredProfiles ? filteredProfiles : profiles;

  const displayProfiles = profilesToShow.map((profile) => {
    // Only display profiles if a user profile has been created
    if (Object.entries(profile.profile).length > 0) {
      return <UserCard profile={profile} key={profile.id} />;
    }
  });

  const handleStatusFilter = (e, { value }) => {
    console.log("value", value);
    if (value === "all") {
      setShowFilteredProfiles(false);
      return;
    }
    const profilesByStatus = profiles.filter(
      (profile) => profile.status === value
    );
    setFilteredProfiles(profilesByStatus);
    setShowFilteredProfiles(true);
  };

  return (
    <div style={{ marginTop: 200 }}>
      <div style={{ textAlign: "center" }}>
        <h1>Explore Users</h1>
        <h1>Filter by status</h1>
        <FilterProfiles handleStatusFilter={handleStatusFilter} />
      </div>
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
