import React, { useState, useContext } from 'react'
import Logout from './Logout'
import { UserContext } from './UserContext'
import {
  Button, Container, Icon, Menu, Responsive, Segment, Sidebar, Visibility,
  Dropdown
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';


// Needs fix for page scroll and mobile view

const Navigation = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext)


  const trigger = (
    <span>
      <Icon name='user' /> Hello, {user ? user.username : <div></div>}
    </span>
  )


  const options = [
    { key: 'profile', text: 'My Profile', as: Link, to: `/${user ? user.username : '/'}` },
    { key: 'explore', text: 'Explore', as: Link, to: '/users' },
    { key: 'inbox', text: 'Inbox', as: Link, to: '/inbox' },
    { key: 'sign-out', text: 'Sign Out', as: Logout },
  ]


  const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

  const DesktopContainer = () => {
    const [hideFixedMenu, setHideFixedMenu] = useState(false)
    const [showFixedMenu, setShowFixedMenu] = useState(true)



    return (
      <>
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={() => setShowFixedMenu(showFixedMenu)}
            onBottomPassedReverse={() => setHideFixedMenu(hideFixedMenu)}
          >
            {/* <Segment
              inverted
            > */}
            <Menu
              fixed='top'
              inverted
              secondary
              size='large'
              style={{ background: 'black' }}
            >
              <Container>
                <Menu.Item as='a' active href="/">Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>Contact</Menu.Item>
                <Menu.Menu position='right'>
                  {user ? <>
                    <Menu.Item><Dropdown trigger={trigger} options={options} /></Menu.Item>
                    <Menu.Item href='/inbox'><Icon name='envelope outline' /></Menu.Item>
                  </> :
                    <>
                      <Button href="/login" as='a' inverted={!hideFixedMenu} style={{ margin: 'auto' }}>
                        Log in
                        </Button>
                      <Button href="/signup" as='a' inverted={!hideFixedMenu} primary={hideFixedMenu}
                        style={{ margin: 'auto', marginLeft: '1em' }}>
                        Sign Up
                        </Button>
                    </>}
                </Menu.Menu>
              </Container>
            </Menu>
            {/* </Segment> */}
          </Visibility>
        </Responsive>
      </>
    )
  }

  const MobileContainer = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    return (
      <>
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <Sidebar
            as={Menu}
            animation='push'
            inverted
            onHide={() => setSideBarOpen(!sideBarOpen)}
            vertical
            visible={sideBarOpen}
          >
            {user ?
              <>
                <Menu.Item as='a' active href='/'>Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                {/* <Menu.Item as='a' href='/users'>Explore Users</Menu.Item> */}
              </> :
              <>
                <Menu.Item as='a' active href='/'>Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a' href="/login">Log in</Menu.Item>
                <Menu.Item as='a' href="/signup">Sign Up</Menu.Item>
              </>
            }
          </Sidebar>
          <Sidebar.Pusher dimmed={sideBarOpen}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 120, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={() => setSideBarOpen(!sideBarOpen)}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {user ? <Dropdown position='right' trigger={trigger} options={options} />
                      :
                      <>
                        <Button href="/login" as='a' >
                          Log in
                        </Button>
                        <Button href="/signup" as='a' style={{ marginLeft: '0.5em' }}>
                          Sign Up
                        </Button>
                      </>}
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Responsive>
      </>
    )
  }

  return (
    <>
      <DesktopContainer />
      <MobileContainer />
    </>
  )
}

export default Navigation