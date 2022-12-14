import Link from "next/link";
import styles from "../styles/styles.module.css";
import Image from "next/image";
import logo from "../static/logo.PNG";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FirstPost() {
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
        {/* <h1>Dashboard</h1>
        <h2>
          <Link href="/">Back to home</Link>
        </h2> */}
      </div>
      <div className={styles["dashboard__search-wrapper"]}>
        <SlMagnifier className={styles["dashboard__search-icon"]} />
        <input className={styles.dashboard__search} placeholder="Search" />
      </div>
      <div className={styles["dashboard__products"]}>
        {obj.map((obj) => (
          <>
            <div className={styles.dashboard__product}>
              <div className={styles["dashboard__product-image-wrapper"]}>
                <Image src={obj.img} width={100} height={100} />
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
                <div className={styles["dashobard__products-status"]}>
                  <span>Status:&nbsp;</span>
                  {obj.Status}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <div>
        {obj.map((obj) => (
          <>
            <Image src={obj.img} width={50} height={50} />
            <li key={obj.id}>{obj.serial}</li>
          </>
        ))}
      </div> */}
    </>
  );
}
