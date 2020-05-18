/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import messagesService from "../../services/messages";
import {
  Button,
  Modal,
  Form,
  Header,
  TextArea,
  Container,
} from "semantic-ui-react";
import { UserContext } from "../UserContext";

const SendMessage = ({ userTo }) => {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [userFrom, setUserFrom] = useContext(UserContext);

  const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  messagesService.setToken(userFrom.token);
  console.log("userTo", userTo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (message.length > 0) {
        console.log(userFrom.token);

        const result = await messagesService.create({
          userFrom: userFrom.id,
          userTo: userTo,
          message: message,
        });
        setModalOpen(false);
        console.log("send message", result);
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <Container>
        <Modal
          style={{
            height: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto",
          }}
          as={Form}
          onSubmit={handleSubmit}
          size="tiny"
          trigger={
            <Button onClick={() => setModalOpen(true)}>Message User</Button>
          }
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Header icon="pencil" content={`Message ${userTo}`} as="h2" />
          <Modal.Content>
            <Form.Field
              control={TextArea}
              value={message}
              onChange={handleChange}
              placeholder="Tell us more about yourself..."
            />
            {saved ? <div>Saved!</div> : null}
          </Modal.Content>
          <Modal.Actions>
            <Button
              type="submit"
              color="red"
              icon="times"
              content="Close"
              onClick={() => setModalOpen(false)}
            />
            <Button type="submit" color="green" icon="save" content="Send" />
          </Modal.Actions>
        </Modal>
      </Container>
    </>
  );
};

export default SendMessage;
