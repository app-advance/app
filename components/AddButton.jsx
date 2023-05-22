import React from "react";

const AddButton = (props) => {
  return (
    <button
      className="px-5 py-1 bg-blue-900 border border-1 border-blue-900 hover:bg-white hover:text-blue-900 my-2 rounded-full text-sm text-white duration-300"
      onClick={props.handleClickAdd}
    >
      Нэмэх
    </button>
  );
};

export default AddButton;
