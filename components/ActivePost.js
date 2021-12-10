import React from "react";
import Link from "next/link";
import styles from "./../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ActivePost = ({ activePost, characters }) => {
  const properties = activePost.properties;

  return (
    <Link href={`/campaigns/posts/${activePost.id}`} passHref>
      <div className={styles.postcard}>
        <h2>{properties.Name.title[0].text.content}</h2>
        <div className={styles.postcardDetails}>
          <p>{properties.Location.rich_text[0].text.content}</p>
          <p className={styles.characterCount}>
            <FontAwesomeIcon icon={faUser} />{" "}
            {properties.Characters.relation.length}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActivePost;
