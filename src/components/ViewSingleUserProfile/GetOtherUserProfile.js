import React, { useEffect, useState } from 'react'
import profilesServices from '../../services/profiles'
import uuid from 'uuid/v4'
import OtherUserProfilePage from './OtherUserProfilePage'
import { Image } from 'semantic-ui-react'

const DEFAULT_USER_PROFILE = {
  userInfo: [],
  profile: [],
  avatar: [],
  upload: []
}

// Names are pretty confusing here. Could help to update db schema as well.

const GetOtherUserProfile = (props) => {
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE)
  const username = props.match.params.username
  const { upload } = profile
  const [state, setState] = useState();



  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    let user = await profilesServices.getProfile(username)
    if (!user) {
      setState(() => {
        throw new Error('User does not exist')
      })
    }
    setProfile({ ...profile, userInfo: user, profile: user.profile[0], avatar: user.avatar[0].avatar, upload: user.upload })
  }


  const displayImages = upload.map(image =>
    <Image key={uuid()}
      src={image.portfolio}
      wrapped ui={true}
      alt=""
      rounded
      style={{ cursor: 'pointer', margin: '0.5em' }}
    />
  )

  return (
    <OtherUserProfilePage profile={profile} displayImages={displayImages} username={username} />
  )
}

export default GetOtherUserProfile