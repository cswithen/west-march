// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const fetchBoard = async (req, res) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_JOBBOARD_DATABASE_ID,
  });

  res.status(200).json({ response });
};

export default fetchBoard;
