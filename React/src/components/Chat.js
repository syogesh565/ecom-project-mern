// src/Chat.js
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { addDoc, collection } from 'firebase/firestore'; // Import addDoc and collection

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore.collection('messages').get();
        const newMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();
  }, []);

  const sendMessage = async () => {
    try {
      // Use addDoc instead of firestore.collection().add
      const docRef = await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        timestamp: new Date(),
      });
  
      console.log('Document written with ID: ', docRef.id);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
