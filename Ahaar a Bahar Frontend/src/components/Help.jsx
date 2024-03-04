import React, { useState } from "react";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";
import { supportdata } from "../utils/constants";

const Help = () => {
  const [itemClicked, setitemClicked] = useState("partner-onboarding");
  const menuclicked = (item) => {
    setitemClicked(item.type);
  };
  return (
    <div>
      <Header></Header>
      <div className="px-[10%] pt-20">
        <div className="min-h-screen shadow-2xl grid grid-cols-12 px-[10%] gap-8 ">
          <div className="h-[screen] bg-gray-100 col-span-3">
            <div>
              <div className="pl-8">
                {supportdata.map((item) => (
                  <div
                    key={item.type}
                    className={`mt-8  h-20 flex justify-center items-center ${
                      itemClicked === item.type ? "bg-white" : ""
                    }`}
                    onClick={() => menuclicked(item)}
                  >
                    <Link to={`/support/${item.type}`}>
                      {" "}
                      <h1
                        className={`text-2xl font-bold text-gray-500 hover:text-black`}
                      >
                        {item.title}
                      </h1>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Outlet className="col-span-8 border border-black" />
        </div>
      </div>
    </div>
  );
};

export default Help;
