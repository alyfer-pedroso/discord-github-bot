import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as routes from "./routes/index.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

app.use("/", routes.github);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
