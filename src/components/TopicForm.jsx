import { handleChange } from "../utils/HandleFormChange";
import closeBtn from "../assets/close.png";
import { useLocation } from "react-router-dom";

export default function TopicForm({
  formLabel,
  setFormData,
  formData,
  setError,
  handleSubmit,
  setToggleCreateTopic,
  toggleCreateTopic = false,
  toggleUpdateTopic = false,
  error,
}) {
  const toggled = toggleCreateTopic || toggleUpdateTopic;
  const location = useLocation();
  const splitPathnameArr = location.pathname.split("/");
  console.log(splitPathnameArr);
  return (
    <div
      className={`h-[calc(100vh-5rem)] overflow-x-hidden ${
        toggled ? "w-full" : "w-0"
      } flex flex-col items-center justify-start bg-white absolute top-20 transition-all duration-600 ease-in-out`}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative top-25 flex flex-col gap-6 max-w-[400px] px-2 min-w-[330px] w-full"
      >
        <img
          src={closeBtn}
          className="h-8 w-8 cursor-pointer"
          onClick={() => setToggleCreateTopic(false)}
        />
        <h1 className="text-2xl font-bold place-self-center">{formLabel}</h1>
        <label className="flex flex-col font-bold">
          Title
          <input
            className="rounded-md text-black bg-white hover:border-gray-400 border-1 border-gray-300 py-2 pl-1 focus:border-[#CF1818] focus:outline-none"
            type="text"
            name="topic"
            placeholder="Title"
            value={formData.topic}
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        <label className="flex flex-col font-bold">
          Content
          <textarea
            className="min-h-40 rounded-md text-black bg-white hover:border-gray-400 border-1 border-gray-300 py-2 pl-1 focus:border-[#CF1818] focus:outline-none"
            name="description"
            placeholder="Content"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData, setError)}
          ></textarea>
        </label>
        <label className="flex flex-col font-bold">
          Image Url
          <input
            className="rounded-md text-black bg-white hover:border-gray-400 border-1 border-gray-300 py-2 pl-1 focus:border-[#CF1818] focus:outline-none"
            type="url"
            placeholder="www.image-picture.jpeg"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        {error && <p>{error?.message}</p>}
        <button className="w-full text-white font-semibold bg-[#CF1818] rounded-md py-3 hover:bg-[#be1414] cursor-pointer mb-10">
          {formLabel.split(" ")[0]}
        </button>
      </form>
    </div>
  );
}
