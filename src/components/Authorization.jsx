import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Authorization() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if ((path === "/login" || path === "/register") && token) {
      navigate("/", { replace: true });
    }

    if (path === "/create-topic" && !token) {
      navigate("/login", { replace: true });
    }
  }, [location, navigate, token]);

  return <Outlet />;
}
