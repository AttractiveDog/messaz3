import React, {useState, useEffect} from "react";
import "./Chat.css"
import { Avatar, IconButton} from "@material-ui/core";
import { useParams } from "react-router-dom";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomID } = useParams();
  const [ roomName, setRoomName] = useState("");
  const [Messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue([]);
  useEffect(() => {
    if (roomID){
      db.collection('rooms').doc(roomID).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ));
      db.collection('rooms')
        .doc(roomID)
        .collection("Messages")
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) =>
          doc.data()))
      );
    }
  }, [roomID]);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>", input);
    db.collection('rooms').doc(roomID).collection('Messages').add({
      Name: user.displayName,
      messages: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    })
    setInput('');
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src="https://avatars.dicebear.com/api/human/234324.svg"/>
        <div className="chat_headerinfo">
          <h3>{roomName}</h3>
          <p>{Messages.Name}
          </p>
        </div>
        <div className="chat_headerRight">
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {Messages.map(Messages => (
          <p className={`chat_message ${Messages.Name === user.displayName && "chat_reciver"}`}>
            <span className="chat_name">{Messages.Name}</span>
            {Messages.messages}
            <span className="chat_time">
              {new Date(Messages.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
      <InsertEmoticonIcon />
        <form>
          <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/>
          <button type="submit" onClick={sendMessage}> Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
