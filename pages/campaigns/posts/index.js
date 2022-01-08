import { useState } from "react";
import styles from "../../../styles/NewRequest.module.css";
import Layout from "../../../components/Layout";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [responsibleparty, setResponsibleparty] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [location, setLocation] = useState("");

  const submitPosting = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        responsibleparty,
        reward,
        location,
      }),
      headers: {
        "Notion-Version": "2021-08-16",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    setTitle("");
    setResponsibleparty("");
    setDescription("");
    setReward("");
    setLocation("");
  };

  return (
    <Layout>
      <div className={styles.main}>
        <h1 className={styles.title}>Create a New Request</h1>
        <hr className={styles.break} />
        <div className={styles.formHouse}>
          <div className={styles.formContainer}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              required
            />
            <span className={styles.highlight} />
            <span className={styles.bar} />
            <label htmlFor="title">Request Name</label>
          </div>
          <div className={styles.formContainer}>
            <input
              type="text"
              value={responsibleparty}
              onChange={(e) => setResponsibleparty(e.target.value)}
              name="responsibleparty"
              required
            />
            <span className={styles.highlight} />
            <span className={styles.bar} />
            <label htmlFor="responsibleparty">Responsible Party</label>
          </div>
          <div className={styles.formContainer}>
            <textarea
              type="text"
              rows="5"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className={styles.textArea}
            />
            <span className={styles.highlight} />
            <span className={styles.bar} />
            <label htmlFor="description">Request Description</label>
          </div>

          <div className={styles.formContainer}>
            <input
              type="text"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              name="reward"
              required
            />
            <span className={styles.highlight} />
            <span className={styles.bar} />
            <label htmlFor="reward">Reward (optional)</label>
          </div>
          <div className={styles.formContainer}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name="place"
              required
            />
            <span className={styles.highlight} />
            <span className={styles.bar} />
            <label htmlFor="place">Location (optional)</label>
          </div>
          <button className={styles.button} onClick={submitPosting}>
            Submit Posting
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewPost;
