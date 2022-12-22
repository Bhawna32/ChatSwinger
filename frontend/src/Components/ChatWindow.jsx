import React, { useRef } from 'react';
import {
    
    // TextField,
    // Button,
    Typography,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Card,
    InputLabel,
  } from "@mui/material";
  import SendIcon from "@mui/icons-material/Send";
  import AttachFileIcon from '@mui/icons-material/AttachFile';
  import { io } from "socket.io-client";
  
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4500"));
  }, []);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null)
  const fileRef = useRef();

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      console.log("message received", data);
      //setChat([...chat, data.message]);    this is not adding subsequent messages, but replacing previous one, so
      setChat((prev) => [...prev, {message: data.message, received: true}]);
    });

    socket.on("typing-started-from server", () => setTyping(true));
    socket.on("typing-stopped-from-server", () => setTyping(false));

    socket.on("uploaded", (data) => {
        setChat((prev) => [...prev, {message: data.buffer, received: true, type: "image"}]);
    });

  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, {message, received: false}]);
    setMessage("");
  }

  function handleInput(e){
    setMessage(e.target.value);
    socket.emit("typing-started");

    if(typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(setTimeout(() => {
        socket.emit("typing-stopped");
    }, 1000))

  }

  function selectFile(){
    fileRef.current.click();
  }

  function fileSelected(e){
    //console.log(e.target.files);
    const file = e.target.files[0];

    if(!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const data = reader.result;
        socket.emit("upload", {data});
    }; 
  }

  return (
    <>
    <h1 style={{textAlign:"center"}}>Chats</h1>
    <Box sx={{display: "flex", justifyContent: "center"}}>
        <Card sx={{padding:2, marginTop: 10, width: "60%", backgroundColor: 'aliceblue'}}>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) => data.type === "image" ? (
            <img src={data.message} alt="uploadedImg" width="200" />
          ) : (
            <Typography sx={{textAlign: data.received ? "left" : "right"}} key={data.message}>{data.message}</Typography>
          ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          {/* <TextField
          sx={{backgroundColor:"white", width: "70%"}}
            label="Write your message"
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="text" type="submit">
            <SendIcon />
          </Button>

          <br />
          <h1>OR</h1>
          <br /> */}
            {typing && (
                <InputLabel sx={{color:"gray", fontStyle: "italic"}} shring htmlFor='message-input'>
                Typing...
            </InputLabel>
            )}
          <OutlinedInput
          sx={{backgroundColor:"white"}} fullWidth
          id="message-input"
            placeholder="Write your message"
            value={message}
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <input onChange={fileSelected} ref={fileRef} type="file" style={{display: "none"}} />
                <IconButton type="button" edge="end" sx={{marginRight: 0.5}} onClick={selectFile}>
                  <AttachFileIcon />
                </IconButton>
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
    </Card>
    </Box>
    </>
   
  )
}

export default ChatWindow
