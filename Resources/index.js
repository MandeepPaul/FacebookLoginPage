const express = require("express"),
  app = express(),
  cookieParser = require("cookie-parser"),
  sessions = require("express-session"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  credentials = require("./credentials"),
  routes = require("./routes/route")(app);

// load env variables
const dotenv = require("dotenv");
dotenv.config();

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`DB connection error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(
  sessions({
    resave: true,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    cookie: { maxAge: 3600000 },
  })
);

app.set("port", process.env.PORT || 3100);

app.use(express.static(__dirname + "/public"));

app.use("/", routes);

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate"
  );
});

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});
