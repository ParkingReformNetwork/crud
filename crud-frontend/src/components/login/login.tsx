import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { ConnectingAirportsOutlined, SettingsSuggestRounded } from "@mui/icons-material";
// import 'dotenv/config';

// for env file
// require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false
  }
});

...
declare global {
  interface Window {
    handleSignInWithGoogle?: any;
  }
}

function Login() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null);
    });

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // useEffect(() => {
  //   const {data, error} = await supabase.auth.getSession();

  //   console.log(data);
  // }, []);

  const navigate = useNavigate();

  window.handleSignInWithGoogle = async(response) => {
    console.log("Encoded JWT ID Token: ", response.credential);

    try {
      const serverResponse = await fetch("http://localhost:8000/auth/google", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential })
        });

        console.log(serverResponse);
        if(serverResponse.ok) {
          console.log("Login successful on server");
          const {data, error} = await supabase.auth.refreshSession();
          const {session, user} = data;

          console.log(data);
          // const {user, session} = supabase.auth.session()
          
          // const data = await supabase.auth.onAuthStateChange((event, session) => {
          //   console.log(event, session);
          // });

          // console.log("Auth session: ", data);

          // navigate("/logged-in");
        } else {
          console.log("Login failed on server");
        }
    } catch (error) {
      console.error("Error sending token to server: ", error);
    }
  }

  return (
    <>
      <div className="google-login-button">
        <div id="g_id_onload"
          data-client_id="757897629512-3ltcl0q206uancd3h7jbi63aaj3levud.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSignInWithGoogle"
          data-auto_prompt="false">
        </div>

        <div className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
        </div>
      </div>
    </>
  );
}

export default Login;
