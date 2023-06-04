import React from "react";

const MySearch = ({ value = "", onChange }) => {
  return (
    <input
      className={`border-b border-b-1 border-b-gray-500 px-1 text-sm w-72`}
      placeholder="Хайлт"
      value={value}
      onChange={onChange}
      type="text"
      name="search"
    />
  );
};

export default MySearch;
