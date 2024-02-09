import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Homepage = () => {
  const [jobs, setJobs] = useState({});
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [functions, setFunctions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedFunctions, setSelectedFunctions] = useState({});
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationRes, deptRes, funcRes] = await Promise.all([
          fetch("https://teknorix.jobsoid.com/api/v1/locations"),
          fetch("https://teknorix.jobsoid.com/api/v1/departments"),
          fetch("https://teknorix.jobsoid.com/api/v1/functions"),
        ]);
        if (!locationRes.ok || !deptRes.ok || !funcRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData1 = await locationRes.json();
        const jsonData2 = await deptRes.json();
        const jsonData3 = await funcRes.json();

        setLocations(jsonData1);
        setDepartments(jsonData2);
        setFunctions(jsonData3);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchJobsData();
  }, [search, selectedLocations, selectedFunctions, selectedDepartment]);

  useEffect(() => {
    const selectedValuesArray = [];
    if (selectedDepartment.title) {
      selectedValuesArray.push(selectedDepartment);
    }
    if (selectedLocations.title) {
      selectedValuesArray.push(selectedLocations);
    }
    if (selectedFunctions.title) {
      selectedValuesArray.push(selectedFunctions);
    }
    setSelectedValues(selectedValuesArray);
  }, [selectedDepartment, selectedLocations, selectedFunctions]);

  const fetchJobsData = async () => {
    try {
      let apiUrl = "https://teknorix.jobsoid.com/api/v1/jobs";
      const queryParams = new URLSearchParams();

      if (search) queryParams.append("q", search);
      if (selectedDepartment.id) {
        queryParams.append("dept", selectedDepartment.id);
      }
      if (selectedLocations.id) {
        queryParams.append("loc", selectedLocations.id);
      }
      if (selectedFunctions.id) {
        queryParams.append("fun", selectedFunctions.id);
      }

      if (queryParams.toString()) {
        apiUrl += `?${queryParams.toString()}`;
      }

      const queryResponse = await fetch(apiUrl);
      if (!queryResponse.ok) {
        throw new Error("Failed to fetch query data");
      }
      const queryData = await queryResponse.json();

      const groupedJobs = queryData.reduce((acc, job) => {
        const departmentTitle = job.department.title;
        if (!acc[departmentTitle]) {
          acc[departmentTitle] = [];
        }
        acc[departmentTitle].push(job);
        return acc;
      }, {});
      // console.log("ppp", groupedJobs);
      setJobs(groupedJobs);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const removeSelectedItem = (index) => {
    setSelectedValues((prevValues) => {
      const updatedValues = prevValues.filter((_, i) => i !== index);

      setSelectedDepartment(
        updatedValues.find(
          (value) => value.title === selectedDepartment.title
        ) || {}
      );
      setSelectedLocations(
        updatedValues.find(
          (value) => value.title === selectedLocations.title
        ) || {}
      );
      setSelectedFunctions(
        updatedValues.find(
          (value) => value.title === selectedFunctions.title
        ) || {}
      );
      return updatedValues;
    });
  };

  const clearAllFilters = () => {
    setSelectedDepartment({});
    setSelectedLocations({});
    setSelectedFunctions({});
    setSelectedValues([]);
    setSearch("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-6 w-5/6 mx-auto">
      <div className="bg-gray-200 mt-8 py-4">
        <div className="py-4 px-10">
          <div className="relative">
            <input
              type="text"
              className="block w-full p-3 pr-12 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
              placeholder="Search for job"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 py-3 text-sm font-medium text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={() => {}}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between mx-4 space-x-6 px-6">
          <select
            type="text"
            className="block p-3  w-1/3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
            value={JSON.stringify(selectedDepartment)}
            onChange={(e) => setSelectedDepartment(JSON.parse(e.target.value))}
          >
            <option value="" disabled={true}>
              Department
            </option>
            {departments.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            type="text"
            className=" block p-3 w-1/3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
            value={JSON.stringify(selectedLocations)}
            onChange={(e) => setSelectedLocations(JSON.parse(e.target.value))}
          >
            <option disabled={true} value="">
              Location
            </option>
            {locations.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            type="text"
            className="block p-3 w-1/3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
            value={JSON.stringify(selectedFunctions)}
            onChange={(e) => setSelectedFunctions(JSON.parse(e.target.value))}
          >
            <option disabled={true} value="">
              Function
            </option>
            {functions.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedValues.length > 0 && (
        <div className="bg-gray-200 my-4 py-4 px-10 flex justify-between">
          <div className="space-x-2  flex justify-center items-center">
            {selectedValues.map((item, index) => (
              <p key={index} className="bg-white p-2 ">
                {item?.title}{" "}
                <span
                  className="text-green-700 hover:cursor-pointer"
                  onClick={() => removeSelectedItem(index)}
                >
                  X
                </span>
              </p>
            ))}
          </div>
          <div>
            <button className="px-4 py-2" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
        </div>
      )}

      <div className="spacing-y-6 mt-6">
        {Object.entries(jobs).map(([department, jobs]) => (
          <div key={department} className="mb-10">
            <h1 className="text-4xl font-bold">{department}</h1>
            <div className="bg-blue-500 w-9 h-1 mt-3 mb-4" />

            {jobs.map((job) => (
              <Card key={job.id} job={job} all={jobs} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
