const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const coursesRoutes = require("./routes/api/courses");
const app = express();

const serverConfig = require("./config/server-config");
const { server } = require("./config/server-config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION, GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Header", "*");
  next();
});

app.use("/api/courses", coursesRoutes);

app.listen(serverConfig.port, serverConfig.ip, () =>
  console.log(`Server started at ${serverConfig.server}: ${serverConfig.port}`)
);
