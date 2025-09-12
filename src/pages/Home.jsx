import { useEffect, useState } from "react";
import { GetHomeTopics, safeApiCall } from "../services/HomeService";
import { Link } from "react-router-dom";
import { TransformDate } from "../utils/TransformDate";
import Loader from "../components/Loader";
import TopicCard from "../components/TopicCard";
export default function Home({ payload }) {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getTopics() {
    const { data, error } = await safeApiCall(GetHomeTopics, setLoading);
    if (error) return setError(error);
    setTopics(
      data
        ? [
            { ...data.latestTopic[0], title: "Latest Topic" },
            { ...data.mostLikes[0], title: "Most Likes" },
            {
              ...data.mostComments[0],
              title: "Most Comments",
            },
          ]
        : []
    );
  }

  useEffect(() => {
    getTopics();
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div className="flex flex-col items-center mx-2 pt-4 min-h-screen">
      <h1 className="text-2xl text-purple font-bold">Welcome!</h1>
      {loading ? (
        <Loader />
      ) : (
        topics.map((t) => <TopicCard key={t._id} t={t} payload={payload} />)
      )}
    </div>
  );
}
