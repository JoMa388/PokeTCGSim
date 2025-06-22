const Dropdown = ({ value, setter, text, optValues, filterTarget }) => {
  return (
    <div className="flex items-center my-2">
      <label htmlFor="cardType" className="font-bold text-xl w-24">
        {text}
      </label>
      <select
        id="cardType"
        className="bg-red-600 w-40 p-2 items-center text-lg rounded font-bold"
        onChange={(e) => setter((prev) => ({ ...prev, [filterTarget]: e.target.value }))}
        value={value}
      >
        <option value=""></option>
        {optValues.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
