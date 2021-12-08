import styles from "../../styles/Home.module.css";
import { getDatabase } from "../../lib/notion";
import Link from "next/link";
import CompletedPost from "../../components/CompletedPost";

const jobBoardDbId = process.env.NOTION_JOBBOARD_DATABASE_ID;
const characterDBId = process.env.NOTION_CHARACTERS_DATABASE_ID;

export default function CampaignBoard({
  postings,
  characters,
  completedPostings,
  inProgressPostings,
  requestedPostings,
  availablePostings,
}) {
  // console.log("All postings", postings);
  // console.log("Completed postings", completedPostings);
  // console.log("In Progress postings", inProgressPostings);
  // console.log("Requested postings", requestedPostings);
  // console.log("Ready postings", availablePostings);
  // console.log("All Characters", characters);

  const filteredPosts = postings.filter(
    (post) => post.properties.Status.select.name !== "Completed"
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Job Postings</h1>
        {filteredPosts.map((post, index) => (
          <Link key={post.id} href={`/campaigns/posts/${post.id}`} passHref>
            <div className={styles.card}>
              <h2>{post.properties.Name.title[0].text.content}</h2>
              <p>Status: {post.properties.Status.select.name}</p>
              {post.properties.Characters.relation.map((player) => (
                <span className={styles.cardlist} key={player.id}>
                  {
                    characters[
                      characters
                        .map((element) => {
                          return element.id;
                        })
                        .indexOf(player.id)
                    ].properties.Name.title[0].plain_text
                  }
                </span>
              ))}
            </div>
          </Link>
        ))}
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
              {completedPostings.map((completedPost, index) => {
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

export async function getStaticProps() {
  const jobBoard = await getDatabase(jobBoardDbId);
  const characters = await getDatabase(characterDBId);

  let completedPostings = [];
  let inProgressPostings = [];
  let availablePostings = [];
  let requestedPostings = [];

  jobBoard.forEach((post) => {
    console.log(post.properties.Status.select.name);
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
      postings: jobBoard,
      characters: characters,
      completedPostings,
      inProgressPostings,
      availablePostings,
      requestedPostings,
    },
    revalidate: 20,
  };
}
