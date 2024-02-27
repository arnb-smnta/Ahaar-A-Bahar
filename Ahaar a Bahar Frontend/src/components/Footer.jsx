import React from "react";

const Footer = () => {
  return (
    <div className="bg-black md:min-h-[600px] flex justify-between py-20 px-[20%]">
      <div>
        <h1 className="text-white font-bold text-4xl">Ahaar A Bahar</h1>
        <h2 className="text-gray-200 text-2xl mt-2">@ Arnab_Smnta</h2>
      </div>
      <div className="text-white">
        <h1 className="font-bold text-3xl">My Connection Lists</h1>
        <h2 className="text-xl text-gray-200">Instagram</h2>
        <h2 className="text-xl text-gray-200">FB</h2>
        <h2 className="text-xl text-gray-200">Github</h2>
        <h2 className="text-xl text-gray-200">Linkedin</h2>
      </div>
      <div className="text-white">
        <h1 className="font-bold text-3xl">We Deliver to</h1>
        <h2 className="text-xl text-gray-200">Delhi</h2>
        <h2 className="text-xl text-gray-200">Kolkata</h2>
        <h2 className="text-xl text-gray-200">Chennai</h2>
        <h2 className="text-xl text-gray-200">Bangalore</h2>
      </div>
    </div>
  );
};

export default Footer;
