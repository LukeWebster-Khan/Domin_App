import styles from "../styles/styles.module.css";
import Image from "next/image";
import logo from "../static/logo.PNG";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import useSWR from "swr";
import { useState, createContext } from "react";
import Modal from "react-modal";
import { DashboardModal } from "./api/components/Modal";
import { BarChart } from "./api/components/BarChart";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Move into hook & useEffect

export const ModalContext = createContext();

export default function dashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const { data, error } = useSWR("/api/staticdata", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  let obj = JSON.parse(data);

  return (
    <>
      <div className={styles.dashboard__header}>
        <div className={styles.flex}>
          <Image
            src={logo}
            alt="Domin Logo"
            width={75}
            height={75}
            className={styles.login__image}
          />
          <h2>ASCEND</h2>
        </div>
        <AiOutlinePlusCircle size={60} />
      </div>
      <div className={styles["dashboard__search-wrapper"]}>
        <SlMagnifier className={styles["dashboard__search-icon"]} />
        <input className={styles.dashboard__search} placeholder="Search" />
      </div>
      <div className={styles["dashboard__products"]}>
        {obj.map((obj, index) => (
          <div key={index} className={styles.dashboard__product}>
            <div className={styles["dashboard__product-image-wrapper"]}>
              <Image
                alt={obj.product.type}
                src={obj.product.img}
                width={100}
                height={100}
              />
            </div>
            <div className={styles["dashboard__product-desc"]}>
              <div className={styles["dashobard__products-serial"]}>
                <span>S/N:&nbsp;</span>
                {obj.product.serial}
              </div>
              <div className={styles["dashobard__products-type"]}>
                <span>Type:&nbsp;</span>
                {obj.product.type}
              </div>
              <div className={styles["dashobard__products-location"]}>
                <span>Location:&nbsp;</span>
                {obj.product.Location}
              </div>
              <div className={styles["dashboard__products-status"]}>
                <span>Status:&nbsp;</span>
                <div
                  className={
                    obj.product.Status == "Active"
                      ? styles["dashboard__products-status--active"]
                      : styles["dashboard__products-status--error"]
                  }
                >
                  {obj.product.Status}
                </div>
                <Modal isOpen={isOpen} ariaHideApp={false}>
                  <div className={styles["dashboard__modal-nav"]}>
                    <p>{modalProduct.serial}</p>
                    <button onClick={() => setIsOpen(false)}>close</button>
                  </div>

                  <div className={styles.dashboard__product}>
                    <div className={styles["dashboard__product-image-wrapper"]}>
                      <Image
                        alt="modal_pic"
                        src={modalProduct.img}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles["dashboard__product-desc"]}>
                      <div className={styles["dashobard__product-serial"]}>
                        <span>S/N:&nbsp;</span>
                        {modalProduct.serial}
                      </div>
                      <div className={styles["dashobard__products-type"]}>
                        <span>Type:&nbsp;</span>
                        {modalProduct.type}
                      </div>
                      <div className={styles["dashobard__products-location"]}>
                        <span>Location:&nbsp;</span>

                        {modalProduct.location}
                      </div>
                      <div className={styles["dashboard__products-status"]}>
                        <span>Status:&nbsp;</span>
                        <div
                          className={
                            modalProduct.Status == "Active"
                              ? styles["dashboard__products-status--active"]
                              : styles["dashboard__products-status--error"]
                          }
                        >
                          {modalProduct.Status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles["dashboard__modal-headers"]}>
                    <div>
                      <h2>Info</h2>
                    </div>
                    <div>
                      <h2>Configure</h2>
                    </div>
                    <div>
                      <h2>Reports</h2>
                    </div>
                  </div>
                  <div className={styles["dashboard__modal-tab"]}>
                    <h2>Integrated Electronics</h2>
                    <div className={styles["dashboard__modal-tab-stats"]}>
                      <div>
                        <span>{modalProduct.temp}</span>
                        <p>Temperature</p>
                      </div>
                      <div>
                        <span>{modalProduct.hours}</span>
                        <div>Operating hours</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles["dashboard__modal-tab"]}>
                    <h2>Operational Characteristics</h2>
                    <div className={styles["dashboard__modal-tab-char"]}>
                      <div>
                        <span>Analog input value:&nbsp;</span>
                        {modalProduct.value}
                      </div>
                      <div>
                        <span>Spool Position:&nbsp;</span>
                        {modalProduct.spool}
                      </div>
                      <div>
                        <span>Pressure(P):&nbsp;</span>
                        {modalProduct.pressure}
                      </div>
                      <div>
                        <span>Flow torque:&nbsp;</span>
                        {modalProduct.flow}
                      </div>
                    </div>
                  </div>
                  <div className={styles["dashboard__modal-tab"]}>
                    <BarChart data={modalProduct.chartdata} />
                  </div>
                </Modal>
                <ModalContext.Provider
                  value={{
                    setIsOpen,
                    setModalProduct,
                  }}
                >
                  <DashboardModal obj={obj} />
                </ModalContext.Provider>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
