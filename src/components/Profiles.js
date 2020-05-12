import React, { useState, useEffect } from 'react'
import usersService from '../services/users'


const DEFAULT_PROFILE = {
  userInfo: [],
  profile: [],
  avatar: [],
  upload: []
}

const Profiles = () => {
  const [profiles, setProfiles] = useState(DEFAULT_PROFILE)

  useEffect(() => {
    usersService.getAll().then(allProfiles => setProfiles(allProfiles))
  }, [])

  console.log('profiles', profiles)

  return (
    <div>

    </div>
  )
}

export default Profiles