import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {io} from "socket.io-client";

const Room = () => {
  const params = useParams();

  useEffect(() => {
    //socket.emit('join-room', {roomId: params.roomId})
    console.log(params);
  }, [params])
  return (
    <div>
      Room
    </div>
  )
}

export default Room
