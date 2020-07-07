/** @format */

import React, { useState, useContext } from "react";
import Logout from "../Logout";
import { UserContext } from "../UserContext";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

// Needs fix for page scroll and mobile view

const Navigation = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(UserContext);

  let isUser = user ? true : false;

  const trigger = (
    <span>
      <Icon name='user' /> Hello, {isUser ? user.username : <div></div>}
    </span>
  );

  const options = [
    {
      key: "profile",
      text: "My Profile",
      as: Link,
      to: `/myprofile/${isUser ? user.username : "/"}`,
    },
    { key: "explore", text: "Explore", as: Link, to: "/profiles" },
    { key: "inbox", text: "Inbox", as: Link, to: "/inbox" },
    { key: "sign-out", text: "Sign Out", as: Logout },
  ];

  const getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
  };

  const DesktopContainer = () => {
    const [hideFixedMenu, setHideFixedMenu] = useState(false);
    const [showFixedMenu, setShowFixedMenu] = useState(true);

    return (
      <>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
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
              style={{ background: "black" }}
            >
              <Container>
                <Menu.Item as={Link} to='/' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>Contact</Menu.Item>
                <Menu.Menu position='right'>
                  {isUser ? (
                    <>
                      <Menu.Item>
                        <Dropdown trigger={trigger} options={options} />
                      </Menu.Item>
                      <Menu.Item as={Link} to='/inbox'>
                        <Icon name='envelope outline' />
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Button
                        as={Link}
                        to={"/login"}
                        inverted={!hideFixedMenu}
                        style={{ margin: "auto" }}
                      >
                        Log in
                      </Button>
                      <Button
                        as={Link}
                        to={"/register"}
                        inverted={!hideFixedMenu}
                        primary={hideFixedMenu}
                        style={{ margin: "auto", marginLeft: "1em" }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </Menu.Menu>
              </Container>
            </Menu>
            {/* </Segment> */}
          </Visibility>
        </Responsive>
      </>
    );
  };

  const MobileContainer = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

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
            {isUser ? (
              <>
                <Menu.Item active as={Link} to='/'>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                {/* <Menu.Item as='a' href='/users'>Explore Users</Menu.Item> */}
              </>
            ) : (
              <>
                <Menu.Item active as={Link} to='/'>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as={Link} to='/login'>
                  Log in
                </Menu.Item>
                <Menu.Item as={Link} to='/register'>
                  Sign Up
                </Menu.Item>
              </>
            )}
          </Sidebar>
          <Sidebar.Pusher dimmed={sideBarOpen}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 120, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={() => setSideBarOpen(!sideBarOpen)}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {isUser ? (
                      <Menu.Item>
                        <Dropdown
                          position='right'
                          trigger={trigger}
                          options={options}
                        />
                      </Menu.Item>
                    ) : (
                      <>
                        <Button as={Link} to='/login'>
                          Log in
                        </Button>
                        <Button
                          as={Link}
                          to='/register'
                          style={{ marginLeft: "0.5em" }}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Responsive>
      </>
    );
  };

  return (
    <>
      <DesktopContainer />
      <MobileContainer />
    </>
  );
};

export default Navigation;
