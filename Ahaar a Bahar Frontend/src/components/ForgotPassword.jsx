import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const resetpassword = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-gray-200 sm:h-[1200px] h-screen w-[100%] sm:w-[2400px] flex justify-center items-center shadow-2xl">
      <div className="sm:w-[30%] sm:h-[30%] h-[40%] bg-white rounded-sm">
        <section className="border border-b-4">
          <h1 className="text-4xl font-serif font-extrabold p-4 pb-6 ">
            Find Your Account
          </h1>
        </section>
        <section>
          <p className="text-2xl p-4 font-mono">
            Please enter your email address or mobile number to reset your
            password
          </p>
        </section>
        <section className="flex justify-center my-2 border border-b-4 pb-6">
          <input
            type="text"
            placeholder="Email Address or mobile number"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="border border-gray-400 h-12 w-[95%] text-center"
          />
        </section>

        <section className="flex justify-between w-[90%] mx-auto pt-4">
          <Link to="/" className="w-[20%]">
            <button className="bg-red-600 w-[100%] sm:h-8 h-12 rounded-lg text-white">
              Cancel
            </button>
          </Link>
          <button
            className="bg-blue-600 text-white w-[20%] sm:h-12 h-12 rounded-lg px-1"
            onClick={resetpassword}
          >
            Reset Password
          </button>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
