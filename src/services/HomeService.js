import axios from "../api/axiosInstance";

export async function GetHomeTopics() {
  const { data: latestTopic } = await axios.get("/latest-topic");
  const { data: mostLikes } = await axios.get("/most-likes");
  const { data: mostComments } = await axios.get("/highest-comment");
  return {
    latestTopic,
    mostLikes,
    mostComments,
  };
}

export async function safeApiCall(callback, setLoading = () => {}) {
  try {
    setLoading(true);
    const data = await callback();
    return { data };
  } catch (error) {
    const errorMsg =
      error.response?.data || error.message || "Something went wrong";
    return { error: errorMsg };
  } finally {
    setLoading(false);
  }
}
