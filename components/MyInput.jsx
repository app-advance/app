import React from "react";

const MyInput = ({
  type,
  id,
  value,
  onChange,
  label,
  action,
  name,
  disabled,
}) => {
  return (
    <div className="relative">
      <input
        className={`border-b border-b-1 border-b-gray-600 block px-3 ${
          action === "login"
            ? "mb-6 pb-1 pt-5 text-md"
            : "pt-1 mb-6 pb-0 text-sm"
        } w-full  text-neutral-700 appearance-none focus:outline-none focus: ring-0 peer`}
        placeholder=" "
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`absolute text-zinc-400 duration-150 transform -translate-y-3 scale-75 ${
          action === "login" ? "pt-4 -top-1 text-md" : "pt-2 -top-2.5 text-sm"
        } left-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}
      >
        {label}
      </label>
    </div>
  );
};

export default MyInput;
