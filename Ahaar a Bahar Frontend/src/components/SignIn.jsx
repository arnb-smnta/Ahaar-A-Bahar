import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { togglemenu } from "./reduxStore/isMenuopen";
const SignIn = () => {
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [fullName, setfullName] = useState("");
  const [signupMenuToggle, setsignupMenuToggle] = useState(false);
  const submit = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  return (
    <div className="Sign-InPage w-[40%] h-screen bg-white ml-auto ">
      <RxCross1
        className="h-8 cursor-pointer"
        onClick={() => dispatch(togglemenu())}
      />
      <div className="pt-[6%] pl-[4%]">
        <section className="flex">
          <section>
            <h1 className="text-3xl">
              {signupMenuToggle ? "Sign up" : "Login"}
            </h1>

            <h3 className="flex pt-[1%]">
              <p>or</p>{" "}
              <p
                className="text-orange-600 ml-3 cursor-pointer"
                onClick={() => setsignupMenuToggle(!signupMenuToggle)}
              >
                {signupMenuToggle
                  ? "login to your account"
                  : "create an account"}
              </p>
            </h3>
          </section>
          <img
            className="ml-[15%] h-25"
            src="https://lh3.googleusercontent.com/fkl-xPLhzKBh82eUVOYCYawRXXx63hQmBlkUItOs-S-soYasB2MluHerrVkpMYz3JlAg=s85"
            alt="bocadillo"
          />
        </section>

        <section className="mt-[10%]">
          <input
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            type="text"
            placeholder="Phone number"
            className="border border-gray-300  h-20 pb-8 pl-4 w-[50%] font-semibold "
          />
          {signupMenuToggle ? (
            <div>
              {" "}
              <section className="mt-">
                <input
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="border border-gray-300  h-20 pb-8 pl-4 w-[50%] font-semibold "
                />
              </section>
              <section>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  className="border border-gray-300  h-20 pb-8 pl-4 w-[50%] font-semibold "
                />
              </section>
            </div>
          ) : null}

          <section className="mt-[5%]">
            <button
              className="bg-orange-600 text-white w-[50%] h-[45px] font-bold "
              onClick={submit}
            >
              {signupMenuToggle ? "CONTINUE" : "LOGIN"}
            </button>
          </section>
        </section>
      </div>
    </div>
  );

