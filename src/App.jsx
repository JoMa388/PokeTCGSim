import Admin from "./pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import DeckBuilder from "./Test/DeckBuilderclone";
import Play from "./pages/Game/Play";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="deckbuilder" element={<DeckBuilder />} />
          <Route path="play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
