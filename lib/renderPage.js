import styles from "../styles/RenderPage.module.css";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlocks } from "./notion";

const renderLineBreaks = (content) => {
  let textContentArray = content.split("\n");

  return textContentArray;
};

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
        {text.link ? (
          <a href={text.link.url}>{text.content}</a>
        ) : (
          renderLineBreaks(text.content).map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))
        )}
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
            href={`/campaigns/posts/${value.text[0].mention.page.id}`}
            passHref
          >
            <p className={styles.JobLink}>{value.text[0].plain_text}</p>
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
      return (
        <li className={styles.bulletedListItem}>
          <Text text={value.text} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li className={styles.numberedListItem}>
          <Text text={value.text} />
        </li>
      );
    case "to_do":
      value.checked ? (value.text[0].annotations.strikethrough = true) : "";
      return (
        <div className={styles.toDoDiv}>
          <label htmlFor={id} className={styles.toDoLabel}>
            {" "}
            <Text text={value.text} className={styles.toDoText} />
            <input
              type="checkbox"
              id={id}
              className={styles.toDoInput}
              defaultChecked={value.checked}
              disabled
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
      );
    case "toggle":
      return (
        <details className={styles.detailContainer}>
          <summary className={styles.summary}>
            <Text text={value.text} />
          </summary>
          <div className={styles.details}>
            {value.children
              ? value.children.map((block) => (
                  <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))
              : ""}
          </div>
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
          <img src={src} alt={caption} className={styles.image} />
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
          {renderLineBreaks(value.text[0].plain_text).map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </blockquote>
      );
    default:
      return `Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};
