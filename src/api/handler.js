import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
const prisma = new PrismaClient();

const handleSearch = async (req, res) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  console.log("🚀 ~ app.get ~ keyword:", keyword);

  try {
    const data = await prisma.$queryRaw`
     SELECT *, 
            ts_rank_cd(to_tsvector('english', title), to_tsquery('english', ${keyword})) AS rank 
     FROM "Post"  -- case-sensitive table name
     WHERE to_tsvector('english', title) @@ to_tsquery('english', ${keyword})
     ORDER BY rank DESC
     LIMIT ${parseInt(limit)} OFFSET ${parseInt(limit) * (parseInt(page) - 1)}`;

    if (data.length === 0) {
      res.status(HttpStatusCode.NotFound).send({ message: "Nothing Found" });
    } else {
      res.status(HttpStatusCode.Ok).send({ length: data.length, data });
    }
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

const handleWelcome = (req, res) => {
  res.send("Hello World!");
};


export { handleSearch, handleWelcome };