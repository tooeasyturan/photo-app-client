/** @format */

import React, { useEffect } from "react";
import { Container, Icon, Loader, Popup } from "semantic-ui-react";
import useImageHandling from "../custom-hooks/useImageHandling";
import PortfolioPictures from "../profiles/PortfolioPictures";

const ContainerStyles = { marginTop: 200, marginLeft: 100 };
const InputStyles = { display: "none" };
const HeaderStyles = { display: "inline", marginRight: 10 };
const LabelStyles = { cursor: "pointer", marginBottom: 45 };

const ManageMyPortfolio = ({ user }) => {
  // const [user, setUser] = useContext(UserContext);
  const {
    fetchPortfolioPictures,
    portfolioPictures,
    handleChange,
    isLoading,
    handleDeletePortfolioPicture,
  } = useImageHandling(user);

  useEffect(() => {
    fetchPortfolioPictures();
  }, []);

  return (
    <>
      <Container style={ContainerStyles} textAlign='center'>
        <input
          name='file'
          type='file'
          className='custom-file-input'
          id='portfolioInput'
          onChange={handleChange}
          style={InputStyles}
        />
        {isLoading ? (
          <Loader active inline />
        ) : (
          <>
            <h1 style={HeaderStyles}>Add Photo</h1>
            <Popup
              trigger={
                <label htmlFor='portfolioInput'>
                  <Icon
                    name='upload'
                    size='huge'
                    color='teal'
                    style={LabelStyles}
                  />
                </label>
              }
              content='Add image to your portfolio'
            />
          </>
        )}
      </Container>
      <PortfolioPictures
        portfolioPictures={portfolioPictures}
        isLoggedInUser
        handleDeletePortfolioPicture={handleDeletePortfolioPicture}
      />
    </>
  );
};

export default ManageMyPortfolio;
