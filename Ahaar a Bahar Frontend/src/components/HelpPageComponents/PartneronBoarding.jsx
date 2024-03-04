import axios from "axios";
import React, { useEffect, useState } from "react";
import { supportapi } from "../../utils/swiggyofficialapis";
import { useDispatch, useSelector } from "react-redux";
import appstore from "../reduxStore/appstore";
import { addSupportData } from "../reduxStore/data.slice";

const PartneronBoarding = () => {
  const dispatch = useDispatch();
  const data = useSelector((appstore) => appstore.data.supportData);
  const pageData = data["partnerOnBoarding"];

  useEffect(() => {
    function getdata() {
      axios
        .get(`${supportapi}partner-onboarding`)
        .then((result) => {
          const key = "partnerOnBoarding";
          const data = result.data.data.issues.data;
          dispatch(addSupportData({ key, data }));
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!pageData) {
      getdata();
    }
  }, []);
  console.log(pageData);

  return <div className="border">PartneronBoarding</div>;
};

export default PartneronBoarding;
