import useHover from "../states/useHover.js"
const HoveredCard = () => {
  const card = useHover((state) => state.card)
  return (
    <div className="w-full rounded-2xl">
      {card && <img src={card.images.large} alt={card.name} className="w-full h-auto " />}
    </div>
  );
};
export default HoveredCard;
