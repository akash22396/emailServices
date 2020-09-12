const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8000;
const path = require("path");
const cors = require("cors");
const user = require("./routes/user/user");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.disable("x-powered-by");
/******************* Cors **********************/
app.use(function (req, res, next) {
  /*  
  //for allowing specific domain  
  var allowedOrigins = [ 'http://127.0.0.1:3000', 'http://localhost:3000'];
         var origin = req.headers.origin;
         if (allowedOrigins.indexOf(origin) > -1) {
           res.setHeader('Access-Control-Allow-Origin', origin);
         }*/

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST"
    // OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

/************ Serve static files ************/
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "images"), { maxAge: "360d" }));

/************  Request Log  *************/
app.use((req, res, next) => {
  console.log(`${new Date()} - ${req.method} - ${req.url} - ${req.host}`);
  next();
});

/*************   Default Api End-point    **************/
app.get("/", async (req, res) => {

  res.send({ message: ":)" });
});

/*************  Routes ************/
app.use("/user", user);

/***********  Server Start Listening  ************/
app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
