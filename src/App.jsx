import Homepage from "./Pages/Homepage";
import JobDetailspage from "./Pages/JobDetailspage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/job-description/:id" element={<JobDetailspage />} />
      </Routes>
    </>
  );
}

export default App;
