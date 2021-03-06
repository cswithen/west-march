import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Directory.module.css";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>West March Assistant</title>
        <meta name="description" content="dnd west march campaign assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>West March Campaign Assistant</h1>

        <div className={styles.grid}>
          <Link href="/campaigns">
            <a className={styles.card}>
              <h2>Job Board</h2>
              <p className={styles.description}>
                Explore or Create Tasks for the group
              </p>
            </a>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
