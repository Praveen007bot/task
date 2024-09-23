import React, { useEffect, useState } from "react";
import logo from "../assets/image 14.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authUser]);
  return (
    <header>
      <nav className="sticky top-0 flex h-20 items-center justify-between border-b bg-background px-8 md:px-6 mx-8">
        <div>
          <Link to={"/"}>
            <img className="w-10" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex gap-8 font-medium text-lg">
          <Link to={"/addgoal"}>Add goal</Link>
          <Link to={"/focusmode"}>Focus mode</Link>
          <Link to={"/history"}>History</Link>
          <Link to={"/about"}>About</Link>
        </div>
        {isLoggedIn ? (
          <Link to={'/profile'}>
            <div className="font-medium text-xl flex items-center gap-2 bg-gray-300 hover:bg-gray-200 p-2 cursor-pointer">
              <IoPersonSharp /> Hi {authUser.username}
            </div>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="bg-black px-4 py-2 text-white font-bold text-lg">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
