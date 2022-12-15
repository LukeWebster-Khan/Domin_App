import Head from "next/head";
import Image from "next/image";
import logo from "../static/logo.PNG";
import Link from "next/link";
import useSWR from "swr";
import styles from "../styles/styles.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Domin</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.login__container}>
        <header>
          <Image
            src={logo}
            alt="Domin Logo"
            width={75}
            height={75}
            className={styles.login__image}
          />
          <h1 className={styles.login__title}>DOMIN</h1>
          <h2 className={styles.login__subtitle}>ASCEND</h2>
        </header>
        <div>
          <p className={styles.login__description}>
            Connect to all your Domin Products
          </p>

          <div className={styles.grid}>
            Configure and access data from your<br></br> devices remotely, in a
            secure manner
          </div>
        </div>
        <div className={styles["login__button__wrapper"]}>
          <Link
            className={
              styles["login__button"] + " " + styles["login__button--blue"]
            }
            href="/api/auth/signin"
          >
            Get Started
          </Link>
          <Link
            className={
              styles["login__button"] + " " + styles["login__button--gray"]
            }
            href="#"
          >
            Log In
          </Link>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}