import axios from "axios";
import React, { useEffect } from "react";
import { Backend_server } from "../utils/envFiles";

const User = () => {
  useEffect(() => {
    axios
      .get(`${Backend_server}/users/current-user`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>User</div>;
};

export default User;
