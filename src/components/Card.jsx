import React from "react";
import { FaBuilding } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Card = ({ job, all }) => {
  return (
    <>
      <div className="flex justify-between py-4 hover:bg-blue-50">
        <div className="">
          <h2 className="text-2xl font-bold mb-2">{job?.title}</h2>
          <div className="flex  items-center space-x-2">
            <span className="mr-2">
              <FaBuilding />
            </span>
            {job?.department?.title}
            <span className="">
              <FaLocationArrow />
            </span>
            {job.location?.title} <span> {job?.type}</span>
          </div>
        </div>
        <div className=" flex space-x-4 justify-center items-center mr-2">
          <Link to={job?.applyUrl} target="_blank" rel="noopener noreferrer">
            <button className="border border-blue-400 rounded-2xl font-bold py-2 px-6 text-blue-500 hover:bg-blue-500 hover:text-white">
              Apply
            </button>
          </Link>
          <Link to={`/job-description/${job?.id}`} state={{ some: all }}>
            <button className="rounded-2xl py-2 px-6 font-bold text-gray-700 hover:bg-gray-200 hover:border hover:border-gray-500">
              View
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
