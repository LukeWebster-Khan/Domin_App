import Link from "next/link";
import styles from "../styles/styles.module.css";
import Image from "next/image";
import logo from "../static/logo.PNG";
import ProductList from "./api/components/ProductList";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";

export default function FirstPost() {
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
      <div></div>
    </>
  );
}
