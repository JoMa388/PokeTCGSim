import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button onClick={() => navigate("/DeckBuilder")} className="btn m-2">
        Deck Editor
      </button>
      <button onClick={() => navigate("/Play")} className="btn m-2">
        {" "}
        Play
      </button>
      <button className="btn m-2">Log Out</button>
    </div>
  );
};
export default Home;
