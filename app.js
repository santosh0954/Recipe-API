var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const sequelize = require("./utils/database");
const config = require('config');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if(!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use("/api/recipe", indexRouter);
app.use("/api/users/", usersRouter);
app.use("/api/auth/", authRouter);

sequelize
  .sync()
  .then((res) => {
    /*console.log(res)*/
  })
  .catch((err) => console.log(err));

module.exports = app;
