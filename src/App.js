import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message.js'
import db from './firebase.js'

function App() {

  //useState is a variable in REACT
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{}]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    //
    db.collection('messages').onSnapshot(snapshot =>  {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [input])

  //useeffect = run code on a condition in REACT 
  useEffect(() => {
    setUsername(prompt('Please enter you name'))
  }, [])

  const sendMessages = (event) => {
    //all the logic to send messages goes
    event.preventDefault(); // Stop Form from reloading page
    setMessages([...messages, {username: username, message: input}]) // Add new input to the messages array
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

      {
        messages.map(message => (
          <Message username={username} message={message} />
        ))
      }
    </div>
  );
}

export default App;
