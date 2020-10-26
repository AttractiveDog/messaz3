import React, { useEffect, useState}from 'react';
import './SidebarChat.css';
import db from "./firebase"
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
function SidebarChat({id, name, addNewChat}) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt('Please enter a name or chat');
    if (roomName) {
      db.collection('rooms').add({
      	name: roomName,
      })
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchats">
          <Avatar src={`https://avatars.dicebear.com/api/human/$(seed).svg`} />
            <div className="sideChats_info">
              <h2>{name}</h2>
              
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
