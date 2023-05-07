const express = require("express");
const dotenv = require("dotenv");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();
const cors = require("cors");
// data base connection
const db = require("./config/connection");
const adminRouter = require("./router/admin");
// .env config
dotenv.config();
// react cros config
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// redirects to roughts

app.use("/api/admin", adminRouter);

app.use(errorHandler);
app.use(notFound);
// data connection call
db.connect((err) => {
  if (err) console.log(`Connection error${err}`);
  else console.log("Datebase Connected.");
});
app.listen(process.env.PORT, () => {
  console.log("sever started running on localhost:3001");
});
