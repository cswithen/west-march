import { notion } from "../../../lib/notion";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200);
  } else if (req.method === "POST") {
    const name = req.body.name;
    const description = req.body.description;
    const newPosting = {
      parent: {
        database_id: process.env.NOTION_JOBBOARD_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
        Status: {
          select: {
            name: "Request",
          },
        },
      },
    };
    await notion.pages.create(newPosting);
    res.status(201).json(newPosting);
  }
}
