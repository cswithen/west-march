import React, { useState } from "react";
import Link from "next/link";
import styles from "./../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const RequestPost = ({ requestPost, characters }) => {
  const properties = requestPost.properties;
  //state
  const [active, setActive] = useState(false);

  // console.log(properties);
  // console.log(active);

  return (
    <div className={styles.postcard}>
      <Link href={`/campaigns/posts/${requestPost.id}`} passHref>
        <div className={styles.postcardHeader}>
          <h2>{properties.Name.title[0].text.content}</h2>
        </div>
      </Link>
      <div
        className={`${styles.postcardFooter} ${
          active ? styles.activeCard : null
        }`}
      >
        <p className={styles.descriptionText}>
          {properties.Description.rich_text[0].text.content}
        </p>
        <button
          className={styles.toggleDescription}
          onClick={() => setActive(!active)}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className={styles.cardDescriptionChevronDown}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.cardDescriptionTimes}
          />
        </button>
      </div>
    </div>
  );
};

export default RequestPost;
