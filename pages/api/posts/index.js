import { notion } from "../../../lib/notion";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200);
  } else if (req.method === "POST") {
    const title = req.body.title;
    const description = req.body.description;
    const responsibleparty = req.body.responsibleparty;
    const reward = req.body.reward;
    const location = req.body.location;

    const newPosting = {
      parent: {
        database_id: process.env.NOTION_JOBBOARD_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title,
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
        Location: {
          rich_text: [
            {
              text: {
                content: location,
              },
            },
          ],
        },
        Reward: {
          rich_text: [
            {
              text: {
                content: reward,
              },
            },
          ],
        },
        ["Responsible Party"]: {
          rich_text: [
            {
              text: {
                content: responsibleparty,
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
