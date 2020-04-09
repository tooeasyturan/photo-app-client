import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'
import '../styles/Landing.css'
import Navigation from './Navigation'
import { Button } from 'semantic-ui-react'

const Landing = () => {
  const [user, setUser] = useContext(UserContext)
  console.log('landing page user', user)

  return (
    <>

      <div className="landing-background" id="landing" >
        {/* <Row className="justify-content-md-center"> */}
        <div className="landing-box">
          <div className="ui vertical center aligned segment">

            <div className="ui text container">
              <h1 className="ui inverted header">
                TFP Application
        </h1>
              <h2>Do whatever you want when you want to.</h2>
              <div>
              </div>

              {
                !user ? <Button secondary size='huge' href="/signup">Sign Up</Button> :
                  <div>
                    <Button secondary size='huge' href={`/${user.username}`}>Go to my profile</Button>
                    <Button secondary size='huge' href='/users'>Explore users</Button>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
      {/* </Row> */}
    </>
  )
}

export default Landing