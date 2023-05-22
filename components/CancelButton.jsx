import React from "react";

const CancelButton = (props) => {
  return (
    <button
      className="px-5 py-1 hover:bg-red-500 border border-1 border-red-500 bg-white text-red-500 my-2 rounded-full text-sm hover:text-white duration-300"
      onClick={props.handleClickCancel}
    >
      Гарах
    </button>
  );
};

export default CancelButton;
