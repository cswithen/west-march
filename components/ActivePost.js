import React, { useState } from "react";
import Link from "next/link";
import styles from "./../styles/AvailablePost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapSigns, faCoins } from "@fortawesome/free-solid-svg-icons";

const ActivePost = ({ activePost, characters }) => {
  const properties = activePost.properties;
  let descriptionArray = [];
  let characterArray = [];

  if (properties.Description.rich_text[0]) {
    descriptionArray =
      properties.Description.rich_text[0].text.content.split("\n");
  }

  if (properties.Characters.relation[0]) {
    characterArray = [];
    properties.Characters.relation.forEach((activeCharacter) => {
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

  // console.log(properties);
  // console.log(characters);

  return (
    <div className={styles.postcard}>
      <Link href={`/campaigns/posts/${activePost.id}`} passHref>
        <div>
          <div className={styles.postHeader}>
            {/* Rendering Job Title */}
            <div className={styles.postHeaderText}>
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
              </div>
            </div>
            {activePost.icon ? (
              <span className={styles.postIcon}>{activePost.icon.emoji}</span>
            ) : (
              ""
            )}
          </div>
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
            {characterArray.map((character) => {
              return (
                <span className={styles.characterTab} key={character.name}>
                  {character.name}
                </span>
              );
            })}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ActivePost;
