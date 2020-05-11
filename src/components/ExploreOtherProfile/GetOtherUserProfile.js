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

const GetOtherUserProfile = (props) => {
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE)
  const username = props.match.params.username
  const { userInfo, avatar, upload } = profile
  console.log(userInfo, avatar, upload)


  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      let user = await profilesServices.getProfile(username)
      console.log('profile', profile)
      setProfile({ ...profile, userInfo: user, profile: user.profile[0], avatar: user.avatar[0].avatar, upload: user.upload })
    } catch (error) {
      console.log(error)
    }
  }


  const displayImages = upload.map(image => {
    return (<Image key={uuid()}
      src={image.portfolio}
      wrapped ui={true}
      alt=""
      rounded
      style={{ cursor: 'pointer', margin: '0.5em' }}
    />)
  })

  return (
    <OtherUserProfilePage profile={profile} displayImages={displayImages} username={username} />
  )
}

export default GetOtherUserProfile