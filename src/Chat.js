import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { SearchOutlined, MoreVert, AttachFile } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const roomId = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const [{ user }] = useStateValue();

  // Whenever roomId changes (in the url) this function get roomName and its messages with respect to particular roomId
  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, "rooms", roomId.roomId);
      getDoc(docRef).then((doc) => {
        setRoomName(doc.data().name);
      });

      const collectionRef = collection(db, "rooms", roomId.roomId, "messages");
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [roomId]);

  // Function to send message into firestore
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    const collectionRef = collection(db, "rooms", roomId.roomId, "messages");

    // adding data into messages collection
    addDoc(collectionRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/6.x/avataaars/svg?${seed}=Felix`}
        />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {" "}
                    {
                        new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                    }
                    </p>
                </div>

        <div className="char__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, i) => (
          <p
            key={i}
            className={`chat__message ${
              user.displayName === message.name && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
