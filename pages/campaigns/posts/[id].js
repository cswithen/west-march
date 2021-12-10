import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";
import { getDatabase, getPage, getBlocks } from "../../../lib/notion";
import { compileBlocks, Text, renderBlock } from "../../../lib/renderPage";
import styles from "../../../styles/Home.module.css";

const jobBoardDbId = process.env.NOTION_JOBBOARD_DATABASE_ID;

const Post = ({ page, blocks }) => {
  const router = useRouter();
  const { id } = router.query;

  // console.log("page", pageProperties);
  // console.log("blocks", blocks);
  // console.log("compiledBlocks", compiledBlocks);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const pageProperties = page.properties;

  if (!page || !blocks) {
    return <div />;
  }
  return (
    <div>
      <article className={styles.container}>
        <h1 className={styles.name}>
          <Text text={pageProperties.Name.title} />
        </h1>
        <h3 className={styles.status}>{pageProperties.Status.select.name}</h3>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/campaigns">
            <a className={styles.back}>← Go Back to Board</a>
          </Link>
        </section>
      </article>
    </div>
  );
};

export default Post;

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  const compiledBlocks = await compileBlocks(blocks);

  return {
    props: {
      page,
      blocks: compiledBlocks,
    },
  };
};
