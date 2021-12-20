import { useState } from "react";
import styles from "../../../styles/Home.module.css";

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

  console.log("renderme");

  return (
    <div>
      <h1>Create a New Request</h1>
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
  );
};

export default NewPost;
