import styles from "../../styles/Home.module.css";
import { Client } from "@notionhq/client";

export default function CampaignBoard({ postings }) {
  console.log(postings);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Job Postings</h1>
        {postings.map((post, index) => (
          <div key={post.id} className={styles.card}>
            <h2>{post.properties.Name.title[0].text.content}</h2>
            <p>Status: {post.properties.Status.select.name}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_JOBBOARD_DATABASE_ID,
  });

  return {
    props: {
      postings: response.results,
    },
    revalidate: 60,
  };
}
