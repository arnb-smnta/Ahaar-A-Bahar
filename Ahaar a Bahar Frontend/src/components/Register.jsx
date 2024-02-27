import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Backend_server } from "../utils/envFiles";
import axios from "axios";

const Register = () => {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [username, setusername] = useState("");
  const [signupstate, setsignupstate] = useState(false);
  const [file, setfile] = useState();
  const signup = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    /*const json = {
      fullname,
      email,
      password,
      username,
      mobile,
      avatar: file,
    };*/
    console.log(file[0]);
    formdata.append("username", username);
    formdata.append("fullname", fullname);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("mobile", mobile);
    formdata.append("avatar", file[0]);

    console.log(formdata);
    axios
      .post(`${Backend_server}/users/register`, formdata)
      .then((result) => {
        console.log(result);
        setsignupstate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return signupstate ? (
    <Navigate to="/" />
  ) : (
    <div className="h-[800px] sm:h-[1200px]  bg-gray-100 sm:w-[2400px] ">
      <div className="h-[100%] sm:h-[1200px] sm:w-[50%] w-[90%] m-auto">
        <section className="m-auto sm:w-[95%] sm:h-[10%] text-center pt-6">
          <h1 className="text-6xl font-extrabold text-blue-600 ">
            Ahaar A Bahar
          </h1>
        </section>

        <section className="sm:h-[60%] sm:w-[50%] h-[80%] w-[95%] bg-white m-auto rounded-lg shadow-2xl">
          <section className="border border-b-4 py-4">
            <h1 className="font-mono text-4xl text-center font-extrabold">
              Create a new account
            </h1>
            <p className="text-center font-serif text-xl text-gray-600">
              Its new talk of town and it's easy too
            </p>
          </section>
          <section className="px-2 my-4">
            <input
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              type="text"
              placeholder="Fullname"
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
            />
          </section>
          <section className="px-2 my-4">
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="text"
              placeholder="email"
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
            />
          </section>
          <section className="px-2 my-4">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
            />
          </section>
          <section className="px-2 my-4">
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="text"
              placeholder="password"
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
            />
          </section>
          <section className="px-2 my-4">
            <input
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              type="text"
              placeholder="confirm password"
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
            />
          </section>
          <section className="px-2 my-4">
            <input
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              type="text"
              name=""
              id=""
              placeholder="mobile"
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
            />
          </section>
          <section className="px-2 my-4">
            <input
              type="file"
              placeholder="avatar-images"
              className="h-12 border border-gray-400 w-[95%] text-center rounded-lg"
              multiple
              onChange={(e) => setfile(e.target.files)}
            />
          </section>

          <section className="text-center px-2 my-4">
            <button
              onClick={signup}
              className="h-12 bg-green-600 w-[50%] rounded-lg"
            >
              Sign Up
            </button>
          </section>

          <section className="my-8">
            <Link to="/">
              <p className="text-blue-600 text-2xl text-center">
                Already have an account ?
              </p>
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Register;
