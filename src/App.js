import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message.js'
import db from './firebase.js'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'

function App() {

  //useState is a variable in REACT
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{}]);
  const [username, setUsername] = useState('');

    // useffect = run code on a condition in REACT 
  // prompt ONCE for the username on the first page reload
  useEffect(() => {
    setUsername(prompt('Please enter you name'))
  }, [])

  // constantly listen to database changes
  // and set messages from the Database
  useEffect(() => {
    //
    db.collection('messages')
      .orderBy('timestamp', 'desc') // Order messages by timestamp descending order
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
      })
  }, [])



  const sendMessages = (event) => {
    //all the logic to send messages goes
    event.preventDefault(); // Stop Form from reloading page

    // this now pushes new messages to the database
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('') // Clear input field after submit
  }

  return (
    <div className="App">
      <h1>Facebook Messenger</h1>
      <h3>Welcome {username}</h3>

      <form>
        <FormControl>
          <InputLabel >Enter a Message...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Button disabled={!input} variant="contained" color="primary" onClick={sendMessages} type="submit">Send Message</Button>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message username={username} message={message} />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
