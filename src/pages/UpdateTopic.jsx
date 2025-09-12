import { useState } from "react";
import TopicForm from "../components/TopicForm";
import Loader from "../components/Loader";
import { safeApiCall } from "../services/HomeService";
import { UpdateTopicSingle } from "../services/TopicSingleService";

export default function UpdateTopic({
  t,
  setToggleUpdateTopic,
  toggleUpdateTopic,
  fetchData,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    topic: t?.topic,
    description: t?.description,
    imageUrl: t?.imageUrl,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await safeApiCall(() =>
      UpdateTopicSingle(t._id, formData)
    );
    if (error) return setError(error);

    setToggleUpdateTopic(false);
    setTimeout(() => {
      fetchData();
    }, 600);

    return data;
  }
  function fillUpdateFormFields() {
    setToggleUpdateTopic(false);
    setFormData({
      topic: t?.topic,
      description: t?.description,
      imageUrl: t?.imageUrl,
    });
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TopicForm
          formLabel="Update Topic"
          setFormData={setFormData}
          formData={formData}
          setError={setError}
          handleSubmit={handleSubmit}
          setToggleCreateTopic={fillUpdateFormFields}
          toggleUpdateTopic={toggleUpdateTopic}
          error={error}
        />
      )}
    </>
  );
}
