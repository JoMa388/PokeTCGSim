const Card = ({ card, onHover }) => {
  return (
    <div onMouseEnter={onHover} key={card.id} className="w-28">
      <img src={card.images.small} alt="card.name" className="" />
    </div>
  );
};
export default Card;
