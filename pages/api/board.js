// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDatabase } from "../../lib/notion";

const fetchBoard = async (req, res) => {
  const response = await getDatabase(process.env.NOTION_JOBBOARD_DATABASE_ID);

  res.status(200).json(response);
};

export default fetchBoard;
