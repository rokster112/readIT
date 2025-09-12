import { useNavigate, useParams } from "react-router-dom";
import { safeApiCall } from "../services/HomeService";
import { useEffect, useState } from "react";
import {
  DeleteTopicSingle,
  GetTopicSingle,
} from "../services/TopicSingleService";
import TopicCard from "../components/TopicCard";
import NotFound from "./NotFound";
import Loader from "../components/Loader";
import TopicSingleComments from "../components/TopicSingleComments";
import UpdateTopic from "./UpdateTopic";

export default function TopicSingle({ token, payload }) {
  const { id } = useParams();
  const [toggleUpdateTopic, setToggleUpdateTopic] = useState(false);
  const [topic, setTopic] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function fetchData() {
    const { data, error } = await safeApiCall(
      () => GetTopicSingle(id),
      setLoading
    );
    if (error) return setError(error);

    setTopic(data ?? {});
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  async function handleDelete() {
    const { data, error } = await safeApiCall(
      () => DeleteTopicSingle(id),
      setLoading
    );

    if (error) return setError(error);

    navigate("/");
    return data;
  }

  return (
    <div className="flex flex-col items-center mx-2 pt-4 min-h-[var(--height-screen)]">
      {loading ? (
        <Loader />
      ) : error.message === "Incorrect Object ID" ? (
        <NotFound />
      ) : (
        <>
          <TopicCard
            t={topic}
            linkable={false}
            token={token}
            payload={payload}
            handleDelete={handleDelete}
            setToggleUpdateTopic={setToggleUpdateTopic}
            toggleUpdateTopic={toggleUpdateTopic}
          />
          <TopicSingleComments payload={payload} id={id} />
          <UpdateTopic
            t={topic}
            setToggleUpdateTopic={setToggleUpdateTopic}
            toggleUpdateTopic={toggleUpdateTopic}
            fetchData={fetchData}
          />
        </>
      )}
    </div>
  );
}
