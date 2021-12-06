import styles from "../../styles/Home.module.css";
import { getDatabase } from "../../lib/notion";

const jobBoardDbId = process.env.NOTION_JOBBOARD_DATABASE_ID;
const characterDBId = process.env.NOTION_CHARACTERS_DATABASE_ID;

export default function CampaignBoard({ postings, characters }) {
  // console.log(postings);
  // console.log(characters);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Job Postings</h1>
        {postings.map((post, index) => (
          <div key={post.id} className={styles.card}>
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
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  console.log(jobBoardDbId);
  const jobBoard = await getDatabase(jobBoardDbId);
  const characters = await getDatabase(characterDBId);
  return {
    props: {
      postings: jobBoard,
      characters: characters,
    },
    revalidate: 20,
  };
}
