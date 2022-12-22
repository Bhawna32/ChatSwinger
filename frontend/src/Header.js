import { Button, Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const roomId = uuidv4();
  return (
    <Card sx={{ marginTop: 5 }}>
      <Link to="/">
        <Button variant="text">Home</Button>
      </Link>
      <Link to="/chats">
        <Button variant="text">Chats</Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button>Room1</Button>
      </Link>
    </Card>
  );
};

export default Header;
