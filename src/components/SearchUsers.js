/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CountryDropdown } from 'react-country-region-selector';



const SearchUsers = ({ users }) => {
  const [country, setCountry] = useState('')
  const [searchedUsers, setSearchedUsers] = useState([])

  const handleSearch = (val) => {
    setCountry(val)
    const usersByCountry = users.filter(user => user.profile[0].country === val)


    if (usersByCountry.length === 0) {
      console.log('There are no users in this country')
      setSearchedUsers([])
    } else {
      setSearchedUsers(usersByCountry)
    }
  }


  return (
    <div>
      <form>
        <CountryDropdown value={country} onChange={(val) => handleSearch(val)} />
      </form>
    </div>
  )
}

export default SearchUsers