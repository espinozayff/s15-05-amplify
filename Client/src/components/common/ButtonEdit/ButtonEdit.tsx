import React from "react";
import { FaPen } from "react-icons/fa";

const ButtonEdit: React.FC = () => {
  return (
    <button className="ml-2 p-2 bg-gray-700 rounded flex items-center justify-center">
      <FaPen className="h-4 w-4 text-white" />
    </button>
  );
};

export default ButtonEdit;
