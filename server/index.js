require("dotenv").config();
const cors = require("cors");

const express = require("express");

const { connectToMongoDB } = require("./database");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
};
startServer();
