const Input = ({ value, setter, label }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="searchName" className="font-bold text-xl w-24">
        {label}
      </label>
      <input type="text" id="searchName" onChange={(e) => setter(e.target.value)} value={value} className="bg-white my-2 p-1 text-black w-80" />
    </div>
  );
};
export default Input;
