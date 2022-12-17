import { useContext } from "react";
import { ModalContext } from "../../_dashboard";
import styles from "../../../styles/styles.module.scss";
import BsArrowLeftCircle from "react-icons/bs";

export const DashboardModal = ({ obj }) => {
  const modalContext = useContext(ModalContext);
  const product = obj.product;

  return (
    <div
      className={styles["dashboard__modal"]}
      onClick={() => {
        modalContext.setModalProduct(product);
        modalContext.setIsOpen(true);
      }}
    ></div>
  );
};
