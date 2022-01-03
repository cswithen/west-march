import React from "react";
import Link from "next/link";

const CompletedPost = ({ completedPost, characters }) => {
  const properties = completedPost.properties;
  return (
    <Link href={`/campaigns/posts/${completedPost.id}`} passHref>
      <tr>
        <td style={{ fontWeight: "bold" }}>
          {properties.Name.title[0].text.content}
        </td>
        <td>
          {properties["Responsible Party"].rich_text[0]
            ? properties["Responsible Party"].rich_text[0].text.content
            : ""}
        </td>
        <td>{properties.Location.rich_text[0].text.content}</td>
        <td>
          {properties.Reward.rich_text[0]
            ? properties.Reward.rich_text[0].text.content
            : ""}
        </td>
        <td>{properties.Characters.relation.length}</td>
      </tr>
    </Link>
  );
};

export default CompletedPost;
