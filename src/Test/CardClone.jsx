import useDeck from "../states/useDeck";
const Card = ({ card, onHover }) => {
  const addCard = useDeck((state) => state.addCard);
  return (
    <img onMouseEnter={onHover}
      onContextMenu={(e) => {
        e.preventDefault();
        addCard(card);
      }} src={card.images.small} alt="card.name" className="border border-black rounded cursor-pointer" />
  );
};
export default Card;
