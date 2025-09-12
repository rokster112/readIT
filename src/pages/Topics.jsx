import { useEffect, useState } from "react";
import { GetAllTopics } from "../services/TopicsService";
import { safeApiCall } from "../services/HomeService";
import Loader from "../components/Loader";
import TopicCard from "../components/TopicCard";
import magnifyingGlass from "../assets/magnifying-glass.png";
import searchIcon from "../assets/search.png";

export default function Topics({ payload }) {
  const [search, setSearch] = useState("");
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function GetTopics() {
    const { data, error } = await safeApiCall(GetAllTopics, setLoading);
    if (error) return setError(error);

    const topicsData = data ?? [];
    setTopics(topicsData);
    setFilteredTopics(topicsData);
  }

  useEffect(() => {
    GetTopics();
  }, []);

  function filterTopics(e) {
    e.preventDefault();
    setFilteredTopics(
      topics.filter((t) => t.topic.toLowerCase().includes(search.toLowerCase()))
    );
  }

  function handleReset() {
    setFilteredTopics(topics);
    setSearch("");
  }

  return (
    <div className="flex flex-col items-center mx-2 pt-4 min-h-[var(--height-screen)]">
      <div className="flex flex-row justify-center items-center">
        <form
          onSubmit={(e) => filterTopics(e)}
          className="flex flex-row items-center"
        >
          <input
            className="w-50 mr-2 border-1 bg-white border-gray-300 p-1 h-8 rounded-md  focus:border-[#CF1818] focus:outline-none"
            type="text"
            placeholder="Search Topics"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="cursor-pointer">
            <img className="h-6 w-6" src={searchIcon} />
          </button>
        </form>
      </div>
      {loading ? (
        <Loader />
      ) : filteredTopics.length > 0 ? (
        filteredTopics.map((t) => (
          <TopicCard key={t._id} t={t} payload={payload} />
        ))
      ) : (
        <div className="flex flex-col m-auto items-center justify-center h-screen gap-4">
          <img className="h-30" src={magnifyingGlass} />
          <h3 className="text-3xl font-bold">{"Topics not found"}</h3>
          <button
            onClick={handleReset}
            className="py-2 px-4 rounded-md text-2xl bg-[#edebee] cursor-pointer font-semibold hover:bg-gray-200"
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
}
