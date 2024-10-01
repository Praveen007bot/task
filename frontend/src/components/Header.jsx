import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { authUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (authUser) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [authUser]);

  const [isLogin, setIsLogin] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav
      className={
        (props.transparent
          ? "top-0 absolute z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 "
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            to={"/"}
            className={
              (props.transparent ? "text-white" : "text-gray-800") +
              " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            }
          >
            Goal Setter
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " fas fa-bars"
              }
            ></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <Link
                to={"/addgoal"}
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") + " text-lg leading-lg mr-2"
                  }
                />{" "}
                Add Goals
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to={"/Goals"}
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") + " text-lg leading-lg mr-2"
                  }
                />{" "}
                Goals
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to={"/focusmode"}
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") + " text-lg leading-lg mr-2"
                  }
                />{" "}
                Focus Mode
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to={"/history"}
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") + " text-lg leading-lg mr-2"
                  }
                />{" "}
                History
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to={"/about"}
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
              >
                <i
                  className={
                    (props.transparent
                      ? "lg:text-gray-300 text-gray-500"
                      : "text-gray-500") + " text-lg leading-lg mr-2"
                  }
                />{" "}
                About
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <a
                className={
                  (props.transparent
                    ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                    : "text-gray-800 hover:text-gray-600") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
                href="#pablo"
              >
                <span className="lg:hidden inline-block ml-2">Star</span>
              </a>
            </li>

            {isLogin ? (
              <>
                <li className="flex items-center">
                  <Link to={"/profile"}>
                    <button
                      className={
                        (props.transparent
                          ? "bg-white text-gray-800 active:bg-gray-100"
                          : "bg-pink-500 text-white active:bg-pink-600") +
                        " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                      }
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      <i className=" mr-4 fas fa-user"></i>
                      {authUser.username}
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center relative">
                  <button
                    className={
                      (props.transparent
                        ? "bg-white text-gray-800 active:bg-gray-100"
                        : "bg-pink-500 text-white active:bg-pink-600") +
                      " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                    }
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={toggleDropdown}
                  >
                    Login <i className="ml-2 fas fa-arrow-alt-circle-right"></i>
                  </button>

                  {/* Dropdown */}
                  {dropdownVisible && (
                    <ul className="absolute mt-10 w-40 bg-white border rounded-lg shadow-lg">
                      <li className="px-4 py-2 hover:bg-gray-100 text-black">
                        <Link to="/login">User</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 text-black">
                        <Link to="admin">Admin</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
