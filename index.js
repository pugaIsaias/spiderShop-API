const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

app.use("/api/courses", require("./routes/api/courses"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
