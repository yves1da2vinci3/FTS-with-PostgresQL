import express from "express";
const app = express();
import morgan from "morgan";
import { handleSearch, handleWelcome } from "./api/handler.js";

app.use(express.json());
app.use(morgan("dev"));
app.get("/search", handleSearch);

app.get("/", handleWelcome);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
