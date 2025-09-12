import { useEffect, useState } from "react";
import { TransformDate } from "../utils/TransformDate";
import CrudButtons from "./CrudButtons";
import { handleChange } from "../utils/HandleFormChange";
import { safeApiCall } from "../services/HomeService";
import { getAllComments, postNewComment } from "../services/CommentService";
import CommentCard from "./CommentCard";
import Loader from "./Loader";

export default function TopicSingleComments({ payload, id }) {
  const [formData, setFormData] = useState({
    text: "",
  });
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getComments() {
    const { data, error } = await safeApiCall(() =>
      getAllComments(id, setLoading)
    );
    if (error) return setError(error);

    setComments(data ?? []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await safeApiCall(() =>
      postNewComment(formData, id)
    );

    if (error) return setError(error);

    setFormData({ text: "" });
    setComments((prev) => [...prev, data.createdcomment]);
    return data;
  }

  useEffect(() => {
    getComments();
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full py-2 flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col bg-white rounded-md p-4 mb-4 min-w-[345px] w-full max-w-[850px] h-fit shadow-2xl"
      >
        <label className="flex flex-col items-center">
          Leave a comment
          <textarea
            className="rounded-md min-h-40 text-black bg-white w-full hover:border-gray-400 border-1 border-gray-300 py-2 pl-1 mt-2 focus:border-[#CF1818] focus:outline-none"
            value={formData.text}
            name="text"
            onChange={(e) => handleChange(e, setFormData, setError)}
          ></textarea>
        </label>
        {error && (
          <p className="my-2 self-center text-[#CF1818] underline">
            {error.message || error}
          </p>
        )}
        <button
          className="self-center w-30 mt-2 text-white font-semibold bg-[#CF1818] rounded-md p-2 hover:bg-[#be1414] cursor-pointer"
          type="submit"
        >
          Comment
        </button>
      </form>
      {comments.length > 0 &&
        comments.map((c) => (
          <CommentCard
            c={c}
            key={c._id}
            payload={payload}
            id={id}
            setComments={setComments}
          />
        ))}
    </div>
  );
}
