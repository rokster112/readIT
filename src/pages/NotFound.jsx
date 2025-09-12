import { Link } from "react-router-dom";
import Notfound from "../assets/not-found.png";

export default function NotFound() {
  return (
    <div className="min-h-[var(--height-screen)] flex flex-col items-center justify-center gap-4">
      <img className="h-40" src={Notfound} />
      <h1 className="text-4xl">404 Not Found</h1>
      <Link
        className="text-xl px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        to={"/"}
        replace={true}
      >
        Home
      </Link>
    </div>
  );
}
