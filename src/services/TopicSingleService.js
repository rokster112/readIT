import axios from "../api/axiosInstance";

export async function GetTopicSingle(id) {
  const { data } = await axios.get(`/topic/${id}`);
  return data;
}

export async function UpdateTopicSingle(id, body) {
  const { data } = await axios.put(`/topic/${id}`, body);
  return data;
}

export async function UpdateLikeDislike(id, body) {
  const { data } = await axios.put(`/topic/${id}`, body);
  return data;
}

export async function DeleteTopicSingle(id) {
  const { data } = await axios.delete(`/topic/${id}`);
  return data;
}

export async function CreateNewTopic(body) {
  const { data } = await axios.post("/topic", body);
  return data;
}
