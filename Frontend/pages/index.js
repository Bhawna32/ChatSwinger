import React, { useContext} from 'react'
import {GlobalInfo} from '../Appcontext/index'
import { useRouter } from 'next/router'

export default function register() 
{
  const { username, setUsername,password, setPassword} = useContext(GlobalInfo);

  const router = useRouter();

  function HandleSubmit(e)
  {
   e.preventDefault();
      fetch("https://friendly-lion-sweatsuit.cyclic.app/api/auth/signup",
      {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username,password})
      })
      .then((res)=>res.json())
      .then((data)=>{
            console.log(data);
            router.push('/login')
            setUsername("");
            setPassword("");
      })
      .catch(err=>{
          console.log(err);
      })
  }
  return (
  <div className="background">
    <div className="auth-container">
    <form className="auth-form" onSubmit={HandleSubmit}>
     <div className="auth-title">ChatApp</div>
     <div className="input-container">
      <input
        type="text"
        className="text-input"
        placeholder="Username"
        name="username"
        required
        onChange={(e)=>setUsername(e.target.value)}
        />
     </div>
     <div className="input-container">
      <input
        type="password"
        className="text-input"
        placeholder="Password"
        name="password"
        required
        onChange={(e)=>setPassword(e.target.value)}
        />
     </div>
     <button
     type="submit"
     className="submit-button"
     >Create your Account</button>
    </form>
    </div>
  </div>
  );
}
