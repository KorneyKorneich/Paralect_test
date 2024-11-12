// TableRow.tsx
import { useContext } from "react";
import styles from "./TableRow.module.css";
import { JobSchema } from "../../lib/shemas";
import { JobsContext } from "../../../context/context";

interface TableRowProps {
  value: JobSchema;
}

export const TableRow = ({ value }: TableRowProps) => {
  const { setJobToUpdate, setIsModalOpen } = useContext(JobsContext);
  const handleModalOpen = () => {
    console.log(value._id);
    setJobToUpdate(value);
    setIsModalOpen(true);
  };
  return (
    <div onClick={handleModalOpen} className={styles.tableRow}>
      <div className={styles.tableCell} data-label="Company">
        {value.company}
      </div>
      <div className={styles.tableCell} data-label="Vacancy">
        {value.vacancy}
      </div>
      <div className={styles.tableCell} data-label="Gross">
        {value.gross}
      </div>
      <div className={styles.tableCell} data-label="Status">
        {value.isOpen ? "Open" : "Closed"}
      </div>
      <div className={styles.tableCell} data-label="Note">
        {value.note}
      </div>
    </div>
  );
};

