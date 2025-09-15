import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReadIt from "../assets/ReadIt-logo.png";
import { handleChange } from "../utils/HandleFormChange";
import { safeApiCall } from "../services/HomeService";
import { LoginUser } from "../services/UserService";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setError(location.state);
    }
  }, [location?.state]);
  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await safeApiCall(() => LoginUser(formData));
    if (error) return setError(error);

    const payload = jwtDecode(data.token);

    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", payload.userName);
    navigate("/", { replace: true });
    return data;
  }

  return (
    <div className="min-h-[var(--height-screen)] flex flex-col justify-center items-center">
      <div className="relative top-[-50px] flex flex-col items-center justify-center">
        <img className="h-14" src={ReadIt} />
        <h1 className="text-4xl text-[#e92515] font-bold relative ">Login</h1>
      </div>
      <form
        className="flex flex-col gap-6 max-w-[400px] px-2 min-w-[330px] w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex flex-col text-purple">
          Username
          <input
            className="rounded-md text-black bg-white hover:border-gray-400 border-1 border-gray-300 py-2 pl-1 focus:border-[#CF1818] focus:outline-none"
            type="text"
            value={formData.userName}
            name="userName"
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        <label className="flex flex-col text-purple">
          Password
          <input
            className="rounded-md text-black bg-white hover:border-gray-400 border-1 border-gray-300 py-2 pl-1 focus:border-[#CF1818] focus:outline-none"
            type="password"
            value={formData.password}
            name="password"
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        {error && (
          <p className="w-[340px] text-[#CF1818] underline">
            {error.message || error}
          </p>
        )}
        <button
          className="w-full text-white font-semibold bg-[#CF1818] rounded-md py-3 hover:bg-[#be1414] cursor-pointer"
          type="submit"
        >
          Log In
        </button>
      </form>
      <p className="text-purple my-3">
        Don't have an account?{" "}
        <Link
          className="text-[#CF1818] hover:underline hover:text-[#be1414]"
          to={"/register"}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
