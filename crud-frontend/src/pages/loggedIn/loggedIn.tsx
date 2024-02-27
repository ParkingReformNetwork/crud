import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../setup/supabaseSetup";
import { useNavigate } from "react-router-dom";


export default function LoggedIn() {
	const {session, user} = useAuth();

	const navigate = useNavigate();

	const signOut = async() => {
		try {
			const { error } = await supabase.auth.signOut();
			if(error) {
				console.error("Error signing out: ", error.message)
			} else {
				console.log("User signed out successfully");
				navigate("/");
			}
		} catch (error) {
			console.error("Error while signing out: ", error)
		}
	}

	return (
		<div>
			{session ? <h1>User is logged in</h1> : <h1>User is not logged in</h1>}
			{user ? <h2>User {user.email} is logged in</h2> : <h2>User has no name</h2>}
			<button onClick={signOut}>Sign Out</button>
		</div>
	)
}

