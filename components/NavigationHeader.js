import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faHome } from "@fortawesome/free-solid-svg-icons";

const NavigationHeader = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href={`/`} passHref>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        <li>
          <Link href={"/campaigns"} passHref>
            Job Board
          </Link>
        </li>
        <li>
          <Link href={"/campaigns/posts"} passHref>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationHeader;
