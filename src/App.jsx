import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import TopicSingle from "./pages/TopicSingle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { isTokenExpired } from "./utils/HandleTokenExpiry";
import Authorization from "./components/Authorization";
import CreateTopic from "./pages/CreateTopic";
import UpdateTopic from "./pages/UpdateTopic";

export default function App() {
  const [toggleCreateTopic, setToggleCreateTopic] = useState(false);
  const token = localStorage.getItem("token");
  const payload = token && jwtDecode(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      isTokenExpired(payload, navigate);
    }

    if (toggleCreateTopic) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [token, navigate, toggleCreateTopic]);

  return (
    <div className={`bg-gray-50 min-h-screen`}>
      <Navbar token={token} setToggleCreateTopic={setToggleCreateTopic} />

      <Routes>
        <Route path="/" element={<Home payload={payload} />} />
        <Route path="/topics" element={<Topics payload={payload} />} />
        <Route
          path="/topics/:id"
          element={<TopicSingle token={token} payload={payload} />}
        >
          <Route element={<UpdateTopic />} />
        </Route>
        <Route element={<Authorization />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CreateTopic
        setToggleCreateTopic={setToggleCreateTopic}
        toggleCreateTopic={toggleCreateTopic}
      />
      <Footer />
    </div>
  );
}
