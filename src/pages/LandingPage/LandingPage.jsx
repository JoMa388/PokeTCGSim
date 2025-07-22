import LoginForm from "./LoginForm";
import { supabase } from "../../supabase-client";
import { useState, useEffect } from "react";
import DeckBuilder from "../DeckBuilder";
import LoggedIn from "./LoggedIn";
const LandingPage = () => {
  const [session, setSession] = useState(null);
  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="flex justify-center items-center h-screen ">
      <>
        {session ? (
          <>
            <LoggedIn />
          </>
        ) : (
          <LoginForm />
        )}
      </>
    </div>
  );
};
export default LandingPage;
