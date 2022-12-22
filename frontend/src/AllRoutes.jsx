import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatWindow from "./Components/ChatWindow";
import Room from "./Pages/Room";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/chats" element={<ChatWindow />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
