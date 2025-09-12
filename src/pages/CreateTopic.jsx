import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { safeApiCall } from "../services/HomeService";
import TopicForm from "../components/TopicForm";
import { CreateNewTopic } from "../services/TopicSingleService";
import Loader from "../components/Loader";

export default function CreateTopic({
  setToggleCreateTopic,
  toggleCreateTopic,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await safeApiCall(
      () => CreateNewTopic(formData),
      setLoading
    );
    if (error) return setError(error);

    setFormData({ topic: "", description: "", imageUrl: "" });
    setTimeout(() => {
      console.log(data._id);
      setToggleCreateTopic(false);
      navigate(`/topics/${data._id}`);
    }, 100);
    return data;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TopicForm
          formLabel="Create Topic"
          setFormData={setFormData}
          formData={formData}
          setError={setError}
          handleSubmit={handleSubmit}
          toggleCreateTopic={toggleCreateTopic}
          setToggleCreateTopic={setToggleCreateTopic}
          error={error}
        />
      )}
    </>
  );
}
