
import { Button } from "src/shared/components/Button/Button";
import styles from "./NavBar.module.css";

interface NavProps {
  setIsModalOpen: (open: boolean) => void;
}

export const NavBar = ({ setIsModalOpen }: NavProps) => {
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Jobs overview</h1>
      <Button text="Add new" onClick={handleModalOpen} />
    </div>
  );
};

