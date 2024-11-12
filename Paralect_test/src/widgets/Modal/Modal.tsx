import React, { useState, useEffect, useContext } from "react";
import styles from "./Modal.module.css";
import { JobsContext } from "src/context/context";
import { JobSchema } from "src/shared/lib/shemas";
import { createJob, deleteJob, updateJob } from "src/shared/lib/api";
import { Button } from "src/shared/components/Button/Button";

export const Modal = () => {
  const {
    isModalOpen,
    jobToUpdate,
    setIsModalOpen,
    setJobToUpdate,
    setJobs,
    jobs,
  } = useContext(JobsContext);

  const [formData, setFormData] = useState<JobSchema>({
    company: "",
    vacancy: "",
    gross: "",
    isOpen: false,
    note: "",
    _id: undefined,
  });
  const handleModalClose = () => {
    setFormData({
      company: "",
      vacancy: "",
      gross: "",
      isOpen: false,
      note: "",
    });
    setIsModalOpen(false);
    setJobToUpdate(null);
  };

  useEffect(() => {
    if (isModalOpen && jobToUpdate) {
      setFormData({
        company: jobToUpdate.company || "",
        vacancy: jobToUpdate.vacancy || "",
        gross: jobToUpdate.gross || "",
        isOpen: jobToUpdate.isOpen || false,
        note: jobToUpdate.note || "",
        _id: jobToUpdate._id,
      });
    }
  }, [isModalOpen, jobToUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleSubmit = async () => {
    let updatedJob: JobSchema;
    if (jobToUpdate !== null) {
      updatedJob = await updateJob(formData);
      setJobs((prevJobs) =>
        (prevJobs || []).map((job) =>
          job._id === updatedJob._id ? { ...job, ...updatedJob } : job
        )
      );
    } else {
      updatedJob = await createJob(formData);
      setJobs((prevJobs) => [...(prevJobs || []), updatedJob]);
    }
    setFormData({
      company: "",
      vacancy: "",
      gross: "",
      isOpen: false,
      note: "",
      _id: undefined,
    });
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (jobToUpdate && jobToUpdate._id) {
      await deleteJob(jobToUpdate?._id);
    }
    const filteredJobs = jobs?.filter((val) => val._id !== jobToUpdate?._id);
    setJobs(filteredJobs || []);
    setFormData({
      company: "",
      vacancy: "",
      gross: "",
      isOpen: false,
      note: "",
      _id: undefined,
    });
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{jobToUpdate ? "Update Job" : "Add Job"}</h2>
        <form>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Vacancy:
            <input
              type="text"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Gross:
            <input
              type="text"
              name="gross"
              value={formData.gross}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.isOpen.toString()}
              onChange={handleInputChange}
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
          </label>
          <label>
            Note:
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
            />
          </label>
        </form>
        <div className={styles.buttonGroup}>
          <Button
            text={jobToUpdate === null ? "Save" : "Update"}
            onClick={handleSubmit}
          />
          {jobToUpdate !== null ? (
            <Button text="Delete" onClick={handleDelete} />
          ) : null}
          <button onClick={handleModalClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

