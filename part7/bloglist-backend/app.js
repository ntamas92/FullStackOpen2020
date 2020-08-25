const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogsController");
const usersRouter = require("./controllers/usersController");
const loginRouter = require("./controllers/loginController");
const testRouter = require("./controllers/testController");
const getAndDecodeToken = require("./utils/authHelper");

const config = require("./utils/config");
const logger = require("./utils/logger");

const isTestEnvironment = process.env.NODE_ENV === "test";

const extractToken = (request, response, next) => {
  const decodedToken = getAndDecodeToken(request);

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  request.token = decodedToken;
  next();
};

let dbUri = config.MONGODB_URI.replace("<dbname>", isTestEnvironment ? "blogs-test-app" : "blogs-app");
logger.info("mongodb_uri:", dbUri);

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => logger.info("DB Connected"))
  .catch((err) => logger.error("error happened during MongoDB connection:", err));

app.use(cors());
app.use(express.json());

if (isTestEnvironment) {
    app.use("/api/testing", testRouter);
  }
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(extractToken);
app.use("/api/blogs", blogsRouter);


const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
