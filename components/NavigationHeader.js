import React from "react";
import Link from "next/link";
import styles from "../styles/Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faHome } from "@fortawesome/free-solid-svg-icons";

const NavigationHeader = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.unorderedList}>
        <Link href={`/`} passHref>
          <li className={styles.listItem}>
            <FontAwesomeIcon icon={faHome} />
          </li>
        </Link>
      </ul>
      <ul className={styles.unorderedList}>
        <Link href={"/campaigns"} passHref>
          <li className={styles.listItem}>Job Board</li>
        </Link>
        <Link href={"/campaigns/posts"} passHref>
          <li className={styles.listItem}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavigationHeader;
