const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
const socetio = require("./socketio/socketio");

const app = express();
const server = http.createServer(app);

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

socetio(server);

// Connect to DB
connectDB();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
/*app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)*/

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "index",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
