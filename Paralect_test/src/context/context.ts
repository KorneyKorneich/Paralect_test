import { createContext } from "react";
import { JobSchema } from "../shared/lib/shemas";

interface JobsContextType {
  jobs: JobSchema[] | null;
  setJobs: React.Dispatch<React.SetStateAction<JobSchema[] | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobToUpdate: JobSchema | null;
  setJobToUpdate: React.Dispatch<React.SetStateAction<JobSchema | null>>;
}

export const JobsContext = createContext<JobsContextType>({
  jobs: null,
  setJobs: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  jobToUpdate: null,
  setJobToUpdate: () => {},
});