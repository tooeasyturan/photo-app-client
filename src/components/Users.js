import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from './User'
import SearchUsers from './SearchUsers'
import uploadsService from '../services/uploads'
import { Card, Icon, Image } from 'semantic-ui-react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import axios from 'axios'



const Users = (props) => {
  const [users, setUsers] = useState([])
  const [country, setCountry] = useState('')
  const [searchedUsers, setSearchedUsers] = useState([])
  const [showSearchedUsers, setShowSearchedUsers] = useState(false)



  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])

  const usersToShow = !showSearchedUsers ? users : searchedUsers

  const usersList = () => usersToShow.map(user =>
    <User
      key={user.id}
      user={user}
    />
  )


  const handleSearch = (val) => {
    setCountry(val)
    const usersByCountry = users.filter(user => user.profile[0].country === val)


    if (usersByCountry.length === 0) {
      console.log('There are no users in this country')
      setSearchedUsers([])
    } else {
      setSearchedUsers(usersByCountry)
      setShowSearchedUsers(true)

    }
  }



  console.log("USERS BY COUNTRY", searchedUsers)

  return (
    <div>
      <h1>Explore Users</h1>
      <form>
        <CountryDropdown value={country} onChange={(val) => handleSearch(val)} />
      </form>
      <Card.Group className="doubling stackable" itemsPerRow={6}>
        {usersList()}
      </Card.Group>
    </div>
  )

}

export default Users