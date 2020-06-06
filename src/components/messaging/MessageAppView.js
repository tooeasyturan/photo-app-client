/** @format */

import React from "react";
import ConvoAvatar from "./ConvoAvatar";
import {
  Button,
  Form,
  Header,
  TextArea,
  Grid,
  Comment,
  Container,
  List,
  Segment,
} from "semantic-ui-react";

const MessageAppView = ({
  users,
  conversations,
  handleFetchMessages,
  handleRemoveConvo,
  messages,
  messagesToDisplay,
  handleSubmit,
  response,
  handleChange,
}) => {
  return (
    <div style={{ marginTop: 75, width: "100%" }}>
      <Container style={{ width: "70%", height: 600 }}>
        <Segment style={{ height: 600 }}>
          <Header as='h1' style={{ textAlign: "center" }}>
            Inbox
          </Header>
          <Grid>
            <Grid.Column width={5}>
              <List selection verticalAlign='middle'>
                {users && conversations ? (
                  users.map((user) => (
                    <List.Item>
                      <ConvoAvatar user={user} />
                      <List.Content
                        verticalAlign='middle'
                        style={{ paddingTop: 5 }}
                      >
                        <List.Header
                          as='h4'
                          onClick={handleFetchMessages}
                          id={conversations[user]}
                          key={conversations[user]}
                        >
                          {user}
                        </List.Header>
                      </List.Content>
                      <Button
                        floated='right'
                        icon='trash alternate outline'
                        size='medium'
                        id={conversations[user]}
                        onClick={(e) => handleRemoveConvo(e, user)}
                      ></Button>
                    </List.Item>
                  ))
                ) : (
                  <h1>Loading</h1>
                )}
              </List>
            </Grid.Column>
            <Grid.Column width={10} style={{ height: 400 }}>
              <Comment.Group
                style={{
                  height: "100%",
                  overflow: "auto",
                  border: "2px solid black",
                  background: "ghostwhite",
                  borderRadius: "5px",
                }}
              >
                {messages ? messagesToDisplay() : null}
              </Comment.Group>
              <Form reply onSubmit={handleSubmit}>
                <Form.TextArea
                  control={TextArea}
                  value={response}
                  onChange={(e) => handleChange(e)}
                  placeholder='Write a response'
                />
                <Button
                  content='Send'
                  labelPosition='left'
                  icon='edit'
                  type='submit'
                  primary
                />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </div>
  );
};

export default MessageAppView;
