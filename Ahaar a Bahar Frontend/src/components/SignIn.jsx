import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaRegEye, FaS } from "react-icons/fa6";
import axios from "axios";
import { Backend_server } from "../utils/envFiles";
const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [login, setlogin] = useState(false);

  const tologin = (e) => {
    e.preventDefault();

    const jsondata = {
      email,
      password,
    };
    axios
      .post(`${Backend_server}/users/login`, jsondata)
      .then((result) => {
        console.log("Response", result);
        setemail("");
        setpassword("");
        setlogin(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return login ? (
    <Navigate to="/create-account" />
  ) : (
    <div className="bg-gray-100 h-screen sm:h-[1200px] w-screen flex items-center justify-center">
      <div className="sm:flex sm:justify-center sm:items-center  w-[80%]  h-[100%] pt-10">
        <div className="Logoclass  mr-8">
          <h1 className="sm:text-8xl text-blue-600 font-extrabold text-4xl mb-4 ">
            Ahaar A Bahar
          </h1>
          <p className="sm:text-4xl text-2xl mb-4">
            Ahaar A Bahar help you find worlds most delicious delicacies
          </p>
        </div>
        <div className=" sm:h-[40%] sm:w-[30%] w-[100%]  text-center bg-white pt-10 shadow-lg rounded-lg">
          <form action="">
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email address or phone number "
                  className="border border-gray-300 h-12 w-[90%] text-2xl text-center "
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  className="border border-gray-300 h-12  text-2xl text-center w-[90%] "
                />
                {/*<FaRegEye className="w-[10%]" />*/}
              </div>
            </div>

            <button
              type="button"
              className="h-12 w-[90%] bg-blue-600 mt-4 rounded-md text-white text-2xl font-extrabold"
              onClick={tologin}
            >
              Log In
            </button>
          </form>

          <Link to="/forgot-password">
            <p className="mt-4 text-xl text-blue-600 hover:cursor-pointer">
              Forgotten password ?
            </p>
          </Link>

          <Link to="/create-account">
            <button className="sm:mt-20 mt-10 bg-green-500 w-[50%] rounded-lg text-white text-2xl font-extrabold h-16">
              Create new Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
