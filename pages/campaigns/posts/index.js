import { useState } from "react";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../components/Layout";

const NewPost = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const submitPosting = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Notion-Version": "2021-08-16",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Layout>
      <h1 className={styles.title}>Create a New Request</h1>
      <div className={styles.main}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        />

        <button onClick={submitPosting}>Submit Posting</button>
      </div>
    </Layout>
  );
};

export default NewPost;
