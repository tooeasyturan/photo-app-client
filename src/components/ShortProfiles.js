import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Card } from 'semantic-ui-react'
import ShortProfile from './ShortProfile'

const ShortProfiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    usersService.getAll().then(profiles => profiles.map(({ id, avatar, username, profile }) => {
      return { id, avatar, username, profile }
    })).then(profiles => setProfiles(profiles))
  }, [])

  window.profiles = profiles

  const displayProfiles = profiles.map(profile =>
    <ShortProfile profile={profile} key={profile.id} />
  )

  return (
    <div style={{ marginTop: 200 }}>
      <h1 style={{ textAlign: 'center' }}>Explore Users</h1>
      <Card.Group className="doubling stackable" itemsPerRow={6} style={{ marginTop: 10 }} centered>
        {profiles.length === 0 ? <div></div> : displayProfiles}
      </Card.Group>
    </div>
  )
}

export default ShortProfiles