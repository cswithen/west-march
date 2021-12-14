import styles from "../../styles/Home.module.css";
import { getDatabase } from "../../lib/notion";
import Link from "next/link";
import CompletedPost from "../../components/CompletedPost";
import ActivePost from "../../components/ActivePost";
import RequestPost from "../../components/RequestPost";

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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Job Postings</h1>
        <div className={styles.bigcontainer}>
          <div className={styles.container}>
            <h2>Requested Postings</h2>
            {requestedPosts.map((requestPost, index) => (
              <RequestPost
                key={index}
                requestPost={requestPost}
                characters={characters}
              />
            ))}
          </div>
          <div className={styles.container}>
            <h2>Available Postings</h2>
            {readyPosts.map((activePost, index) => (
              <ActivePost
                key={index}
                activePost={activePost}
                characters={characters}
              />
            ))}
          </div>
          <div className={styles.container}>
            <h2>In Progress Postings</h2>
            {inProgressPosts.map((inProgressPost, index) => (
              <ActivePost
                key={index}
                activePost={inProgressPost}
                characters={characters}
                inactive
              />
            ))}
          </div>
        </div>

        <div>
          <h3>Completed:</h3>
          <table className={styles.completedTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
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
    </div>
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
