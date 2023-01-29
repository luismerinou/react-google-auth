import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import './App.css';
import { googleLogout } from '@react-oauth/google';


function App() {
  const [user, setUSer] = useState({})

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID TOKEN: " + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUSer(userObject)
    document.getElementById("signInDiv").hidden = true

  }

  function handleSignOut(event){
    setUSer({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    /* global google from script in html*/
    google.accounts.id.initialize({
      client_id: "611628571049-e348cp3d7kgn9ndkdkj77paj7usj5pu4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )

    google.accounts.id.prompt() //show vertical login
  }, [])

  // no user --> show login button
  //user --> show logout

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 && 
      <button onClick={ (e) => handleSignOut(e)}> Sign Out</button>
      }
      
      {user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
