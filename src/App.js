import logo from './logo.svg';
import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode"
import './App.css';


function App() {

  function handleCallbackResponse(response){
      console.log("Encoded JWT ID TOKEN: " + response.credential)
      var userObject = jwt_decode(response.credential)
      console.log(userObject)
  }

  useEffect(() => {
    /* global google from script in html*/
    google.accounts.id.initialize({
      client_id: "611628571049-e348cp3d7kgn9ndkdkj77paj7usj5pu4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  },[])

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
