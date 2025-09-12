import { useState } from "react";
import { deleteComment, updateComment } from "../services/CommentService";
import { safeApiCall } from "../services/HomeService";
import { TransformDate } from "../utils/TransformDate";
import CrudButtons from "./CrudButtons";
import closeBtn from "../assets/close.png";
import { handleChange } from "../utils/HandleFormChange";

export default function CommentCard({ c, payload, id, setComments }) {
  const [toggleCommentEdit, setToggleCommentEdit] = useState(false);
  const [formData, setFormData] = useState({
    text: c?.text,
  });
  const [error, setError] = useState(false);

  async function handleDelete() {
    const { data, error } = await safeApiCall(() => deleteComment(id, c._id));
    if (error) return;

    setComments((prev) => prev.filter((comment) => comment._id !== c._id));
    return data;
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const { data, error } = await safeApiCall(() =>
      updateComment(id, c._id, formData)
    );

    if (error) return setError(error);

    setFormData({ text: c?.text });
    return data;
  }

  return (
    <div className="mb-4 bg-white rounded-md p-4 min-w-[345px] w-full max-w-[850px] h-fit shadow-2xl">
      {payload && c.commentUser === payload.userName && (
        <>
          {toggleCommentEdit ? (
            <img
              src={closeBtn}
              className="h-3 w-3 cursor-pointer place-self-end m-1 transition-all duration-400 ease-in-out hover:scale-125"
              onClick={() => {
                setToggleCommentEdit(false), setFormData({ text: c.text });
              }}
            />
          ) : (
            <CrudButtons
              handleDelete={handleDelete}
              setToggleUpdate={setToggleCommentEdit}
            />
          )}
        </>
      )}
      {toggleCommentEdit ? (
        <form
          onSubmit={(e) => handleUpdate(e)}
          className="flex flex-col bg-white rounded-md p-4 mb-4 min-w-[345px] w-full max-w-[850px] h-fit shadow-2xl"
        >
          <textarea
            onChange={(e) => handleChange(e, setFormData, setError)}
            value={formData.text}
            name="text"
          ></textarea>
          <p className="w-[340px] text-[#CF1818] underline">
            {error.message || error}
          </p>
          <button
            className="self-center w-30 mt-2 text-white font-semibold bg-[#CF1818] rounded-md p-2 hover:bg-[#be1414] cursor-pointer"
            type="submit"
          >
            Update
          </button>
        </form>
      ) : (
        <>
          <div className="flex flex-row px-1 justify-between">
            <p>{c.commentUser}</p>
            <p>
              {c.edited && "Edited"} {c.createdAt && TransformDate(c.createdAt)}
            </p>
          </div>
          <p className="p-1">{c.text}</p>
        </>
      )}
    </div>
  );
}
