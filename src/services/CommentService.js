import axios from "../api/axiosInstance";

export async function postNewComment(formData, id) {
  const { data } = await axios.post(`comment/${id}`, formData);
  return data;
}

export async function getAllComments(id) {
  const { data } = await axios.get(`comment/${id}`);
  return data;
}

export async function deleteComment(id, commentId) {
  const { data } = await axios.delete(`comment/${id}/${commentId}`);
  return data;
}

export async function updateComment(id, commentId, formData) {
  const { data } = await axios.put(`comment/${id}/${commentId}`, formData);
  return data;
}
