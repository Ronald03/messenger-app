import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message.js'
import db from './firebase.js'
import firebase from 'firebase';
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  //useState is a variable in REACT
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get messages from Database and orders it by time
    db.collection('messages')
      .orderBy('timestamp', 'asc') // Order by time in descending order
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, [input])

  /* const scrollBottom = () => {
    const messageDisplay = document.getElementById('messages_dsp');
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
  } */
  useEffect(() => {
    const messageDisplay = document.getElementById('messages_dsp');
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
  }, [messages])

  //useEffect = run code on a condition in REACT 
  useEffect(() => {
    setUsername(prompt('Please enter you name')) // Prompt for name
  }, [])

  const sendMessages = (event) => {
    //all the logic to send messages to Database
    event.preventDefault(); // Stop Form from reloading page
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('') // Clear input field after submit
  }


  return (
    <div className="App">
      <header className="app__header">
        <h1>Like Facebook Messenger</h1>
        <h3>Welcome <span className="user__name">{username}</span></h3>
      </header>

      <FlipMove id="messages_dsp" className="message__display">
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter message..." value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" onClick={sendMessages} type="submit">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>



    </div>
  );
}

export default App;