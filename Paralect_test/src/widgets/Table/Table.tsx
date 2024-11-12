import { useContext, useEffect } from "react";
import styles from "./Table.module.css";

import { TableRow } from "src/shared/components/TableRow/TableRow";
import { JobsContext } from "src/context/context";
import { getAllJobs } from "src/shared/lib/api";

export const Table = () => {
  const { jobs, setJobs } = useContext(JobsContext);
  useEffect(() => {
    async function fetchJobs() {
      const data = await getAllJobs();
      console.log(data);
      setJobs(data);
    }
    fetchJobs();
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.tableCell}>Company</div>
        <div className={styles.tableCell}>Vacancy</div>
        <div className={styles.tableCell}>Gross</div>
        <div className={styles.tableCell}>Status</div>
        <div className={styles.tableCell}>Note</div>
      </div>
      <div className={styles.tableBody}>
        {jobs &&
          jobs.map((value) => <TableRow key={value._id} value={value} />)}
      </div>
    </div>
  );
};

