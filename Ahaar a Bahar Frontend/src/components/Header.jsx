import { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";

import { Link } from "react-router-dom";

const Header = () => {
  const options = ["kolkata", "chennai", "bangalore", "delhi", "hydrebad"];
  const [selectedoption, setselectedoption] = useState(options[0]);
  const handleOptionChange = (e) => {
    setselectedoption(e.target.value);
  };

  return (
    <div className="header  flex justify-between bg-white shadow-lg sm:h-20 fixed min-w-[1800px] w-screen  ">
      <div className="header-half flex justify-between w-[50%] pl-[20%] pr-[20%]">
        <Link to="/">
          <img
            src="https://www.theknowhowlib.com/wp-content/uploads/2020/05/Swiggy-2.png"
            alt="Ahaar A Bahar Icon"
            className="h-[80%] pt-2 cursor-pointer"
          />
        </Link>
        <div className="pt-8 ml-2 cursor-pointer">
          <select
            className="bg-white cursor-pointer"
            value={selectedoption}
            onChange={handleOptionChange}
          >
            {options.map((opt, index) => (
              <option key={index} className="cursor-pointer">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="header-secondhalf flex justify-between w-[50%] pt-8 pr-60">
        <section className="flex cursor-pointer">
          <CiSearch className="h-6" />{" "}
          <h1 className="ml-2 font-medium text-gray-600 hover:text-orange-600">
            Search
          </h1>
        </section>
        <Link to="/support/partner-onboarding">
          <section className="flex cursor-pointer">
            <IoHelpBuoyOutline className="h-6" />
            <h1 className="ml-2 font-medium text-gray-600 hover:text-orange-600">
              Help
            </h1>
          </section>
        </Link>
        <section className="flex cursor-pointer">
          <FaRegUser className="h-6" />
          <h1 className="ml-2 font-medium text-gray-600 hover:text-orange-600">
            Sign In
          </h1>
        </section>
        <Link to="/cart">
          <section className="flex cursor-pointer">
            {" "}
            <FaOpencart className="h-6" />
            <h1 className="ml-2 font-medium text-gray-600 hover:text-orange-600">
              Cart
            </h1>
          </section>
        </Link>
      </div>
    </div>
  );
};

export default Header;
