import axios from "../api/axiosInstance";

export async function RegisterUser(formData) {
  const { data } = await axios.post("/register", formData);
  return data;
}
export async function LoginUser(formData) {
  const { data } = await axios.post("/login", formData);
  return data;
}
