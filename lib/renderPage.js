import styles from "../styles/RenderPage.module.css";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlocks } from "./notion";

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  // console.log(text);
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    if (!text) {
      return null;
    }

    return (
      <span
        key={index}
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];
  // console.log(block);

  switch (type) {
    case "paragraph":
      // console.log(block);
      if (value.text[0] && value.text[0].type === "mention") {
        return (
          <Link
            className={styles.JobLink}
            href={`/campaigns/posts/${value.text[0].mention.page.id}`}
            passHref
          >
            {value.text[0].plain_text}
          </Link>
        );
      }
      return (
        <p className={styles.paragraph}>
          <Text text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className={styles.headerOne}>
          <Text text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className={styles.headerTwo}>
          <Text text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className={styles.headerThree}>
          <Text text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className={styles.listItem}>
          <Text text={value.text} />
        </li>
      );
    case "to_do":
      return (
        <div className={styles.toDoDiv}>
          <label htmlFor={id} className={styles.toDoLabel}>
            <input
              type="checkbox"
              id={id}
              className={styles.toDoInput}
              defaultChecked={value.checked}
            />{" "}
            <Text text={value.text} className={styles.toDoText} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details className={styles.details}>
          <summary className={styles.summary}>
            <Text text={value.text} />
          </summary>
          {value.children
            ? value.children.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))
            : ""}
        </details>
      );
    case "child_page":
      const childPageId = block.id;
      const childTitle = [
        {
          text: { content: value.title },
          annotations: {
            bold: false,
            code: false,
            color: false,
            italic: false,
            strikethrough: false,
            underline: false,
          },
        },
      ];
      return (
        <p className={styles.childPage}>
          <Text text={childTitle} />
        </p>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption[0] ? value.caption[0].plain_text : "";
      return (
        <figure className={styles.imageContainer}>
          <Image
            src={src}
            alt={caption}
            width={500}
            height={500}
            layout="responsive"
            objectFit="contain"
            priority
            className={styles.image}
          />
          {caption && (
            <figcaption className={styles.imageCaption}>{caption}</figcaption>
          )}
        </figure>
      );

    case "divider":
      return <hr key={id} className={styles.divider} />;
    case "quote":
      return (
        <blockquote key={id} className={styles.blockQuote}>
          {value.text[0].plain_text}
        </blockquote>
      );
    default:
      return `Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};
