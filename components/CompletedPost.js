import React from "react";
import Link from "next/link";

const CompletedPost = ({ completedPost, characters }) => {
  const properties = completedPost.properties;
  return (
    <Link href={`/campaigns/posts/${completedPost.id}`} passHref>
      <tr>
        <td>{properties.Name.title[0].text.content}</td>
        <td>{properties.Location.rich_text[0].text.content}</td>
        <td>{properties.Characters.relation.length}</td>
      </tr>
    </Link>
  );
};

export default CompletedPost;
