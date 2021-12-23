import React, { useState } from "react";
import Link from "next/link";
import styles from "./../styles/AvailablePost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapSigns, faCoins } from "@fortawesome/free-solid-svg-icons";

const ActivePost = ({ activePost, characters }) => {
  const properties = activePost.properties;
  let descriptionArray = [];

  if (properties.Description.rich_text[0]) {
    descriptionArray =
      properties.Description.rich_text[0].text.content.split("\n");
  }

  // console.log(properties);
  // console.log(active);

  return (
    <div className={styles.postcard}>
      <Link href={`/campaigns/posts/${activePost.id}`} passHref>
        <div>
          {/* Rendering Job Title */}
          <h2 className={styles.title}>
            {properties.Name.title[0].text.content}
          </h2>
          <div className={styles.postcardDetails}>
            {/* Rendering Responsible Party */}
            {properties["Responsible Party"].rich_text[0] ? (
              <p className={styles.responsibleParty}>
                {properties["Responsible Party"].rich_text[0].text.content}
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
            {/* Rendering Location */}
            {properties.Location.rich_text[0] ? (
              <p className={styles.locationText}>
                {" "}
                <FontAwesomeIcon icon={faMapSigns} />{" "}
                {properties.Location.rich_text[0].text.content}
              </p>
            ) : (
              ""
            )}
            {/* Rendering Reward */}
            {properties.Reward.rich_text[0] ? (
              <p className={styles.reward}>
                <FontAwesomeIcon icon={faCoins} />{" "}
                {properties.Reward.rich_text[0].text.content}
              </p>
            ) : (
              ""
            )}
            {/* Rendering Characters */}
            <p className={styles.characterCount}>
              <FontAwesomeIcon icon={faUser} />{" "}
              {properties.Characters.relation.length}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ActivePost;
