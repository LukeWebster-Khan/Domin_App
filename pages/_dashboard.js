import Link from "next/link";
import styles from "../styles/styles.module.css";
import Image from "next/image";
import logo from "../static/logo.PNG";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function dashBoard() {
  const [count, setCount] = useState(0);
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
          <Link
            href={{
              pathname: "/components/Product",
              query: { obj: JSON.stringify(obj) },
            }}
            props={obj}
            key={index}
          >
            <div className={styles.dashboard__product}>
              <div className={styles["dashboard__product-image-wrapper"]}>
                <Image alt={obj.type} src={obj.img} width={100} height={100} />
              </div>
              <div className={styles["dashboard__product-desc"]}>
                <div className={styles["dashobard__products-serial"]}>
                  <span>S/N:&nbsp;</span>
                  {obj.serial}
                </div>
                <div className={styles["dashobard__products-type"]}>
                  <span>Type:&nbsp;</span>
                  {obj.type}
                </div>
                <div className={styles["dashobard__products-location"]}>
                  <span>Location:&nbsp;</span>
                  {obj.Location}
                </div>
                <div className={styles["dashboard__products-status"]}>
                  <span>Status:&nbsp;</span>
                  <div
                    className={
                      obj.Status == "Active"
                        ? styles["dashboard__products-status--active"]
                        : styles["dashboard__products-status--error"]
                    }
                  >
                    {obj.Status}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
