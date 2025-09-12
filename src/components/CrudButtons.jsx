import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CrudButtons({
  handleDelete = () => {},
  setToggleUpdate,
}) {
  return (
    <div className="flex flex-row my-2 gap-4 justify-end">
      <FiEdit
        size={24}
        className="cursor-pointer"
        onClick={() => setToggleUpdate(true)}
      />
      <FiTrash2 onClick={handleDelete} size={24} className="cursor-pointer" />
    </div>
  );
}
