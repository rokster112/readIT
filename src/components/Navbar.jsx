import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import closeBtn from "../assets/close.png";
import readIt from "../assets/read-it.png";

export default function Navbar({ payload, setToggleCreateTopic, setPayload }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    //I am using timeout because it doesn't nagitate
    // to home "/" route.
    setTimeout(() => {
      navigate("/", { replace: true });
      setPayload(null);
    }, 50);
  }

  return (
    <div className="flex flex-row justify-between items-center h-20 px-3 bg-gray-900">
      <Link
        onClick={() => {
          setToggleMenu(false), setToggleCreateTopic(false);
        }}
        className="h-full flex items-center"
        to={"/"}
      >
        <img className="h-10" src={readIt} />
      </Link>
      <button
        onClick={() => setToggleMenu((prev) => !prev)}
        className={`${
          toggleMenu && "fixed top-4 right-4"
        } group h-9 w-10 z-11 flex flex-col cursor-pointer`}
      >
        {toggleMenu ? (
          <img className="m-1" src={closeBtn} />
        ) : (
          <>
            <span className="w-full h-1/3 my-[2px] bg-[#CF1818] rounded-xl transition-all ease-in-out duration-300 group-hover:w-1/2"></span>
            <span className="w-full h-1/3 my-[2px] bg-[#CF1818] rounded-xl transition-all ease-in-out duration-300 group-hover:w-4/5"></span>
            <span className="w-full h-1/3 my-[2px] bg-[#CF1818] rounded-xl transition-all ease-in-out duration-300 group-hover:w-1/3"></span>
          </>
        )}
      </button>

      <div
        className={`min-h-full fixed top-0 right-0 text-[#CF1818] p-6 ${
          toggleMenu
            ? "w-full sm:w-[300px] lg:w-[400px] z-10 sm:overflow-visible"
            : "w-0 z-[-1] overflow-hidden"
        } bg-gray-900 transition-all duration-600 ease-in-out`}
      >
        <div className={`overflow-hidden flex flex-col mt-10`}>
          <Link
            onClick={() => {
              setToggleMenu(false), setToggleCreateTopic(false);
            }}
            to={"/"}
            className="text-xl font-semibold py-3 px-4 hover:bg-gray-700 rounded"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              setToggleMenu(false), setToggleCreateTopic(false);
            }}
            to={"/topics"}
            className="text-xl font-semibold py-3 px-4 hover:bg-gray-700 rounded"
          >
            Topics
          </Link>
          {!payload ? (
            <>
              <Link
                to={"/login"}
                onClick={() => setToggleMenu(false)}
                className="text-xl font-semibold py-3 px-4 hover:bg-gray-700 rounded"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                onClick={() => setToggleMenu(false)}
                className="text-xl font-semibold py-3 px-4 hover:bg-gray-700 rounded"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => {
                  setToggleMenu(false), setToggleCreateTopic(true);
                }}
                className="text-xl font-semibold py-3 px-4 hover:bg-gray-700 rounded"
              >
                Create Topic
              </Link>
              <Link
                onClick={() => {
                  setToggleMenu(false), logout();
                }}
                className="text-xl font-semibold py-3 px-4 hover:bg-gray-700 rounded"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
