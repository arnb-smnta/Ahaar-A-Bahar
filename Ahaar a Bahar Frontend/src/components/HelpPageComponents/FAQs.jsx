import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supportapi } from "../../utils/swiggyofficialapis";
import { addSupportData } from "../reduxStore/data.slice";

const FAQs = () => {
  const dispatch = useDispatch();
  const data = useSelector((appstore) => appstore.data.supportData);
  const pageData = data["faq"];

  useEffect(() => {
    function getdata() {
      axios
        .get(`${supportapi}faq`)
        .then((result) => {
          const key = "faq";
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
  return <div>FAQs</div>;
};

export default FAQs;
