import styles from "../../styles/JobBoard.module.css";
import { getDatabase } from "../../lib/notion";
import Link from "next/link";
import Head from "next/head";
import CompletedPost from "../../components/CompletedPost";
import ActivePost from "../../components/ActivePost";
import RequestPost from "../../components/RequestPost";
import Layout from "../../components/Layout";
import InProgressPost from "../../components/InProgressPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const jobBoardDbId = process.env.NOTION_JOBBOARD_DATABASE_ID;
const characterDBId = process.env.NOTION_CHARACTERS_DATABASE_ID;

export default function CampaignBoard({
  allPosts,
  characters,
  completedPosts,
  inProgressPosts,
  requestedPosts,
  readyPosts,
}) {
  // console.log("All postings", allPosts);
  // console.log("Completed postings", completedPosts);
  // console.log("In Progress postings", inProgressPosts);
  // console.log("Requested postings", requestedPosts);
  // console.log("Ready postings", readyPosts);
  // console.log("All Characters", characters);

  return (
    <Layout>
      <Head>
        <title>Job Board</title>
        <meta name="description" content="dnd west march campaign assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Job Board</h1>
        <div className={styles.container}>
          <div className={styles.availablePostings}>
            {readyPosts.map((activePost, index) => (
              <ActivePost
                key={index}
                activePost={activePost}
                characters={characters}
              />
            ))}
            <div className={styles.shadow} aria-hidden="true"></div>
          </div>
          <div className={styles.requestedPostings}>
            <h2>Requested Postings</h2>
            {requestedPosts.map((requestPost, index) => (
              <RequestPost
                key={index}
                requestPost={requestPost}
                characters={characters}
              />
            ))}
            <Link href={`/campaigns/posts/`} passHref>
              <div className={styles.newCardHeader}>
                <h3 className={styles.newCardTitle}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </h3>
              </div>
            </Link>
          </div>
        </div>

        <h2>In Progress Postings</h2>
        <div className={styles.inProgressContainer}>
          {inProgressPosts.map((inProgressPost, index) => (
            <InProgressPost
              key={index}
              activePost={inProgressPost}
              characters={characters}
              inactive
            />
          ))}
        </div>

        <div className={styles.tableContainer}>
          <h2>Completed:</h2>
          <table className={styles.completedTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Responsible Party</th>
                <th>Location</th>
                <th>Reward</th>
                <th>Party Size</th>
              </tr>
            </thead>

            <tbody>
              {completedPosts.map((completedPost, index) => {
                return (
                  <CompletedPost
                    key={index}
                    completedPost={completedPost}
                    characters={characters}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const jobBoard = await getDatabase(jobBoardDbId);
  const characters = await getDatabase(characterDBId);

  let completedPostings = [];
  let inProgressPostings = [];
  let availablePostings = [];
  let requestedPostings = [];

  jobBoard.forEach((post) => {
    switch (post.properties.Status.select.name) {
      case "Ready":
        availablePostings.push(post);
        break;
      case "Request":
        requestedPostings.push(post);
        break;
      case "Completed":
        completedPostings.push(post);
        break;
      case "In Progress":
        inProgressPostings.push(post);
        break;
      default:
        console.log(
          `The category of this post is ${post.properties.Status.select.name} `
        );
    }
  });

  return {
    props: {
      allPosts: jobBoard,
      characters,
      completedPosts: completedPostings,
      inProgressPosts: inProgressPostings,
      requestedPosts: requestedPostings,
      readyPosts: availablePostings,
    },
  };
}
