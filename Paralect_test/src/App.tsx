import "./App.css";

import { useState } from "react";
import { JobSchema } from "./shared/lib/shemas";
import { JobsContext } from "./context/context";
import { NavBar } from "./widgets/NavBar/NavBar";
import { Modal } from "./widgets/Modal/Modal";
import { Table } from "./widgets/Table/Table";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<JobSchema[] | null>(null);
  const [jobToUpdate, setJobToUpdate] = useState<JobSchema | null>(null);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
        isModalOpen,
        setIsModalOpen,
        jobToUpdate,
        setJobToUpdate,
      }}
    >
      <div className={`app_wrapper ${isModalOpen ? "pageBlocked" : ""}`}>
        <NavBar setIsModalOpen={setIsModalOpen} />
        <Table />
        <Modal />
      </div>
    </JobsContext.Provider>
  );
}

export default App;

