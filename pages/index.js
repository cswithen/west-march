import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>West March Assistant</title>
        <meta name="description" content="dnd west march campaign assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>West March Campaign Assistant</h1>

        <p className={styles.description}>Check out the job board below!</p>

        <div className={styles.grid}>
          <Link href="/campaigns">
            <a className={styles.card}>
              <h2>Job Board &rarr;</h2>
              <p>Explore or Create Tasks for the group</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
