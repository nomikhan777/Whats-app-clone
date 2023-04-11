import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { useState, useEffect } from "react";

import { SearchOutlined, MoreVert, AttachFile } from "@mui/icons-material";

function Chat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/6.x/avataaars/svg?${seed}=Felix`}
        />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
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
        <p className="chat__message">
          <span className="chat__name">sunny bhai</span>Hey Message
          <span className="chat__timestamp">12:16PM</span>
        </p>
        <p className="chat__message">Hey Message</p>
      </div>

      <div className="chat__footer"></div>
    </div>
  );
}

export default Chat;
