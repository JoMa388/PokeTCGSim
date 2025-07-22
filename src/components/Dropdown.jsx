const Dropdown = ({ value, setter, label, optValues, filterTarget }) => {
  return (
    <div className="flex justify-start items-center mt-2">
      <label htmlFor="cardType" className="font-bold text-md mx-4">
        {label}
      </label>
      <select
        id="cardType"
        className="bg-red-900 w-1/3 items-center text-sm rounded p-1 "
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
    </div >
  );
};
export default Dropdown;
