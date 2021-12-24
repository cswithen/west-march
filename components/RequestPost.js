import React, { useState } from "react";
import Link from "next/link";
import styles from "./../styles/RequestPost.module.css";

const RequestPost = ({ requestPost, characters }) => {
  const properties = requestPost.properties;

  // console.log(properties);
  // console.log(active);

  return (
    <div className={styles.requestCard}>
      <Link href={`/campaigns/posts/${requestPost.id}`} passHref>
        <div className={styles.requestCardHeader}>
          <h3 className={styles.title}>
            {properties.Name.title[0].text.content}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default RequestPost;
