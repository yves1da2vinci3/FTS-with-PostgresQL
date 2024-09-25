import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  try {
    const { data } = await axios.get(
      "https://developer.mozilla.org/en-US/search-index.json"
    );
    await prisma.post.createMany({ data });
    console.log("Seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

seed();
