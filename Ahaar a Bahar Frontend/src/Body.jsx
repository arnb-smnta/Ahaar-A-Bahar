import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import SignIn from "./components/SignIn";
import { useSelector } from "react-redux";

const Body = () => {
  const togglemenu = useSelector(
    (appstore) => appstore.isMenuopen.createAccountMenu
  );

  return (
    <div className="">
      <Header />
      {togglemenu ? <SignIn /> : null}

      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
