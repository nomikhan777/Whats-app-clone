import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import db from "./firebase";
import {Link} from 'react-router-dom'
import {addDoc, collection, query,orderBy, onSnapshot} from 'firebase/firestore'




function SidebarChat({addNewChat,name,id}) {
  const collectionName = 'rooms';
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      if (id) {
          const collectionRef = collection(db, 'rooms', id, 'messages');
          const q = query(collectionRef, orderBy('timestamp', 'desc'));
          onSnapshot(q, snapshot => {
              setMessages(snapshot.docs.map(doc => (doc.data())))
          })
      }
  }, [id])


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt("please enter name for chat room");
    if (roomName) {
      // Do some stuff of database here

      db.collection("rooms").add({
        name:roomName,

      })

    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChat">
      <Avatar
        src={`https://api.dicebear.com/6.x/avataaars/svg?${seed}=Felix`}
      />
      <div className="sidebarChat__info">
        <h2>{name}</h2>

        <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>

  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
