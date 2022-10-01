import { useEffect, useState, useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';
import jwt_decode from "jwt-decode";
import { gapi } from 'gapi-script';

import { googleClientId } from './Constants/common';

import logo from './logo.svg';

import TitlesList from './Components/TitlesList';

import './App.css';

const  App = () => {
  const [user, setUser] = useState({});

  const handleCallbackResponse = useCallback((response) => {
    console.log('response', response);
    var userObject = jwt_decode(response.credential);
  
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }, []);
  
  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  } 

  const initializeGoogleAccount = useCallback(() => {
    const { google } = window;
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCallbackResponse
     });
    
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline",  size: "large"}
    );
  
        google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    initializeGoogleAccount();
  }, []);
 
  return (
    
    <div className="App">
      <div id="signInDiv" />
      {!!Object.keys(user || {}).length && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      
      {!!user && (
          <div>
             <img src={user?.picture} />
            <h3>{user?.name}</h3>
          </div>
        )}
      
       <TitlesList /> 
    </div>
      

  );
}

export default App;

