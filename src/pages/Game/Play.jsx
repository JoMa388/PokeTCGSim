import HoveredCard from "../../components/HoveredCard";
import Board from "./Board";
const Play = () => {
  return (
    <div className="grid grid-cols-5 w-full h-screen">
      <div className="bg-zinc-900 flex flex-col m-2 rounded-2xl">
        <div className="bg-zinc-900 h-3/10 rounded-t-2xl">
          <div className="text-center text-lg mt-2 border-b">Opponent</div>
        </div>
        <div className="bg-zinc-400 h-4/10 "></div>
        <div className="bg-zinc-900 h-3/10 rounded-b-2xl"></div>
      </div>
      <div className="col-span-3 ">
        <Board />
      </div>
      <div className="m-2 ">
        <div className="h-full flex flex-col rounded">
          <HoveredCard />
        </div>
      </div>
    </div>
  );
};
export default Play;
