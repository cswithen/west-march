import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";
import { getDatabase, getPage, getBlocks } from "../../../lib/notion";
import { compileBlocks, Text, renderBlock } from "../../../lib/renderPage";
import styles from "../../../styles/SinglePage.module.css";
import Layout from "../../../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapSigns, faCoins } from "@fortawesome/free-solid-svg-icons";
import ActivePost from "../../../components/ActivePost";

const jobBoardDbId = process.env.NOTION_JOBBOARD_DATABASE_ID;
const characterDBId = process.env.NOTION_CHARACTERS_DATABASE_ID;

const Post = ({ page, blocks, characters }) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const pageProperties = page.properties;
  // console.log(blocks);

  if (!page || !blocks) {
    return <div />;
  }

  let descriptionArray = [];
  let characterArray = [];

  if (pageProperties.Description.rich_text[0]) {
    descriptionArray =
      pageProperties.Description.rich_text[0].text.content.split("\n");
  }

  if (pageProperties.Characters.relation[0]) {
    characterArray = [];
    pageProperties.Characters.relation.forEach((activeCharacter) => {
      const characterIndex = characters
        .map(function (e) {
          return e.id;
        })
        .indexOf(activeCharacter.id);
      const newCharacter = {
        icon: characters[characterIndex].icon,
        name: characters[characterIndex].properties.Name.title[0].text.content,
      };

      characterArray.push(newCharacter);
    });
  }

  // console.log("page", pageProperties);
  // console.log("blocks", blocks);
  // console.log("compiledBlocks", compiledBlocks);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.postHeaderText}>
          {/* Rendering Title */}
          <h2 className={styles.title}>
            {pageProperties.Name.title[0].text.content}
          </h2>

          {/* Rendering Responsible Party */}
          {pageProperties["Responsible Party"].rich_text[0] ? (
            <p className={styles.responsibleParty}>
              {pageProperties["Responsible Party"].rich_text[0].text.content}
            </p>
          ) : (
            ""
          )}
          {/* Rendering Description */}
          {descriptionArray.map((paragraph, index) => {
            return (
              <p className={styles.descriptionText} key={index}>
                {paragraph}
              </p>
            );
          })}
          <div className={styles.postHeaderProperties}>
            {/* Rendering Location */}
            {pageProperties.Location.rich_text[0] ? (
              <p className={styles.locationText}>
                {" "}
                <FontAwesomeIcon icon={faMapSigns} />{" "}
                {pageProperties.Location.rich_text[0].text.content}
              </p>
            ) : (
              ""
            )}
            {/* Rendering Reward */}
            {pageProperties.Reward.rich_text[0] ? (
              <p className={styles.reward}>
                <FontAwesomeIcon icon={faCoins} />{" "}
                {pageProperties.Reward.rich_text[0].text.content}
              </p>
            ) : (
              ""
            )}
            {/* Rendering Characters */}
            <p className={styles.characterCount}>
              <FontAwesomeIcon icon={faUser} />{" "}
              {characterArray.map((character) => {
                return (
                  <span className={styles.characterTab} key={character.name}>
                    {character.name}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <div>
          <hr className={styles.break}></hr>
          {/* Rendering Blocks */}
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Post;

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  const characters = await getDatabase(characterDBId);

  return {
    props: {
      page,
      blocks: blocksWithChildren,
      characters: characters,
    },
  };
};
