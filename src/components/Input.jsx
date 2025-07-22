const Input = ({ id, value, setter, label }) => {
  return (
    <div className="flex items-center justify-start mt-1">
      <label htmlFor={id} className="font-bold text-md w-10 mx-4">
        {label}
      </label>
      <input type="text" value={value} id={id} onChange={(e) => setter(e.target.value)} className="bg-white  text-black w-2/3" />
    </div>
  );
};
export default Input;
