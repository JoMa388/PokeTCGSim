import { useEffect, useState } from "react";
import { supabase } from "../../supabase-client";
import { useNavigate } from "react-router-dom";
const LoggedIn = () => {
  const [username, setUsername] = useState("");
  const getUsername = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const username = user?.user_metadata?.userName;
    setUsername(username);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };
  useEffect(() => {
    getUsername();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 h-1/2 flex flex-col justify-end ">
      <div className="text-xl text-center"> Welcome {username}</div>
      <button onClick={() => navigate("/home")} className="btn btn-success m-4 text-lg text-black">
        Battle
      </button>
      <button onClick={logout} className="btn btn-neutral m-4">
        Log Out
      </button>
    </div>
  );
};
export default LoggedIn;
