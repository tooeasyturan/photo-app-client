
import React from 'react'
import { Paper, Typography, makeStyles, List, ListItem, ListItemText, Chip, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: '50px',
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey'
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px'
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%'
  }
}))

const MessageTheme = () => {
  const classes = useStyles()


  return (
    <div style={{ marginTop: 100 }}>
      <Paper className={classes.root} >
        <Typography variant="h4" component="h4">
          Messages
        </Typography>
        <Typography variant="h5" component="h5">
          Paper can be used to build surface or other thing
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {
                ['topic'].map(topic => (
                  <ListItem key={topic} button>
                    <ListItemText primary={topic}></ListItemText>
                  </ListItem>
                ))
              }
            </List>

          </div>
          <div className={classes.chatWindow}>
            {
              [{ from: 'user', msg: 'hello' }].map((chat, i) => (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography variant='p'>{chat.msg}</Typography>
                </div>
              ))
            }

          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            id='standard-name'
            label='Send a message'
            className={classes.chatBox}
            // value={values.name}
            // onChange={handleChange('name')}
            margin='normal'
          />


          <Button variant='contained' color='primary'>
            Send
        </Button>
        </div>
      </Paper>
    </div>
  )
}

export default MessageTheme