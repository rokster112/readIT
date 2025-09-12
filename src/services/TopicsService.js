import axios from "../api/axiosInstance";

export async function GetAllTopics() {
  const { data } = await axios.get("/topic");
  return data;
}
