import React, { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_ANON_KEY, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
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

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  window.handleSignInWithGoogle = async(response) => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
      redirectTo: 'http://localhost:3000/logged-in'
		},
		})

	} catch (error) {
		console.log("Error:", error);
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