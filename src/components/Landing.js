import React from 'react'
import '../styles/Landing.css'
import Navigation from './Navigation'
import { Button } from 'semantic-ui-react'

const Landing = () => {
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
              {/* <button className="ui huge primary button" href="/signup">Get Started <i className="right arrow icon"></i></button> */}
              <Button secondary size='huge' href="/signup">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
      {/* </Row> */}
    </>
  )
}

export default Landing