/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { createClient, Session, AuthChangeEvent } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_ANON_KEY, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
  }
});

interface AuthContextProps {
	session: Session | null;
	user: any;
}
const AuthContext = createContext<AuthContextProps>({session: null, user: null});

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const sessionListener = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		const fetchSession = async() => {
			try {
				const { data, error } = await supabase.auth.getSession();

				if(error) {
					// Handle error if any
					console.error("Error fetching session: ", error)
				} else if (data && data.session) {
					// session exists
					setSession(data.session);
					setUser(data.session.user ?? null);
				} else {
					// no session exists, set seesion state to null
					setSession(null);
					setUser(null);
				}
			} catch (error) {
				console.error("Unexpected error fetching session: ", error)
			}
		};

		fetchSession();

		return () => {
			if(sessionListener.data.subscription) {
				sessionListener.data.subscription.unsubscribe();
			}
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session, user }}>
			{children}
		</AuthContext.Provider>
	);
};