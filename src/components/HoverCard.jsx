const HoverCard = ({ hoveredCard }) => {
  return (
    <div className="w-full rounded-2xl">
      {hoveredCard && <img src={hoveredCard.images.large} alt={hoveredCard.name} className="w-full h-auto " />}
    </div>
  );
};
export default HoverCard;
