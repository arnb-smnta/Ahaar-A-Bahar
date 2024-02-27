import React from "react";
import { useParams } from "react-router-dom";

const CusinePage = () => {
  const { cuisineType } = useParams();
  return <div className="pt-20">{cuisineType}</div>;
};

export default CusinePage;
