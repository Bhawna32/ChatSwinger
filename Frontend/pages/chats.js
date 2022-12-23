import React, {useState, useEffect, useContext} from "react";
import {GlobalInfo} from '../Appcontext/index'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
let socket

export default function Chats() 
{
  const [input, setInput] = useState('')
  const [user, setUser] = useState('')
  const [allmessage, setAllmessage] = useState([])
   console.log(allmessage);
  useEffect(() => { 
    socketInitializer()
  },[]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('receive-message', (data) => {
      console.log('connected')
      setAllmessage((old)=>[...old, data])
    })
  }

  function HandleSubmit(e)
  {
   e.preventDefault();
      socket.emit('send-message', {
        user,
        input
      });
  }
  return (
   <div className="background">
     <br />
     <div>
      {
        allmessage.map((el,index) => {
          return(
             <p>
                {el.user} : {el.input}
             </p> 
          )
             
      })
    }
      </div>
    <form className="auth-form" onSubmit={HandleSubmit}>

     <div className="input-container">
     <input
        type="text"
        className="text-input"
        placeholder="User"
        name="user"
        required
        onChange={(e)=>setUser(e.target.value)}
        />
      <input
        type="text"
        className="text-input"
        placeholder="Type Your Message"
        name="input"
        required
        onChange={(e)=>setInput(e.target.value)}
        />
     </div>
     <button
     type="submit"
     className="submit-button"
     >Submit</button>
    </form>
    </div>
  ); 
}
