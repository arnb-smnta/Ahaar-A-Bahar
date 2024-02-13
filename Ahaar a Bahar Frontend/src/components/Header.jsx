import { useState } from "react";

const Header = () => {
  const options = ["kolkata", "chennai", "bangalore", "delhi", "hydrebad"];
  const [selectedoption, setselectedoption] = useState(options[0]);
  const handleOptionChange = (e) => {
    setselectedoption(e.target.value);
  };
  return (
    <div className="flex justify-between">
      <div className="header-half flex justify-between">
        <img src="" alt="Ahaar A Bahar Icon" />
        <div>
          <h2>Select your location </h2>
          <select value={selectedoption} onChange={handleOptionChange}>
            {options.map((opt, index) => (
              <option key={index}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="header-secondhalf flex justify-between">
        <h1>Search</h1>
        <h1>Help</h1>
        <h1>Signin</h1>
        <h1>cart</h1>
      </div>
    </div>
  );
};

export default Header;
