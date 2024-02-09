import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const JobDetailspage = () => {
  let { jobId } = useParams();
  let { state } = useLocation();
  const [jobDetail, setJobDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const queryResponse = await fetch(
          `https://teknorix.jobsoid.com/api/v1/jobs/${jobId}`
        );
        if (!queryResponse.ok) {
          throw new Error("Failed to fetch query data");
        }
        const queryData = await queryResponse.json();

        setJobDetail(queryData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchJobsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center item-center mt-40">
        <div
          class="w-12 h-12 rounded-full animate-spin
              border-4 border-solid border-green-500 border-t-transparent"
        ></div>
      </div>
    );
  }

  return (
    <div className="container px-6 w-5/6 mt-4 mx-auto mb-8">
      <div>
        <h2 className="font-bold text-2xl my-2">
          {jobDetail?.department?.title} Department at Teknorix Systems Goa
        </h2>
        <h1 className="font-bold text-4xl my-2">{jobDetail?.title}</h1>
        <div className="flex  items-center space-x-2">
          <span className="mr-2">
            <FaBuilding />
          </span>
          {jobDetail?.department?.title}
          <span className="">
            <FaLocationArrow />
          </span>
          {jobDetail?.location.title} <span> {jobDetail?.type}</span>
        </div>
        <Link
          to={jobDetail?.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mt-4 border border-blue-400 rounded-3xl font-bold py-2 px-16  bg-blue-400 hover:bg-blue-500 text-white">
            Apply
          </button>
        </Link>
      </div>
      <hr className="my-12" />
      <div className="flex w-full space-x-4">
        <div className="w-2/3">
          <div
            className="no-heading-styles"
            dangerouslySetInnerHTML={{ __html: `${jobDetail?.description}` }}
          />
        </div>

        <div className="w-1/3 flex flex-col justify-between px-4 ">
          <div className="bg-blue-100 px-4 border">
            <h3 className="text-2xl font-bold mt-6">Other Job Openings</h3>
            <div className="bg-blue-500 w-9 h-1 mt-3 mb-4" />

            <div className="">
              {state?.some.map((item) => (
                <div className="my-6" key={item.index}>
                  <Link
                    to={item?.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-sm font-bold mb-2 hover:text-blue-400">
                      {item?.title}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-2 text-sm ">
                    <span className="mr-1 ">
                      <FaBuilding />
                    </span>
                    {item?.department?.title}
                    <span className="">
                      <FaLocationArrow />
                    </span>
                    {item.location?.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4">
            <h3 className="text-2xl font-bold">Share Job Openings</h3>
            <div className="bg-blue-500 w-9 h-1 mt-3 mb-4" />
            <div className="flex space-x-8">
              <span>
                <FaFacebook size={42} />
              </span>
              <FaXTwitter size={42} />
              <FaLinkedin size={42} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailspage;
