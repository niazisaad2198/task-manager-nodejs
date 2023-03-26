const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./db/connect");

const tasksRouter = require("./routes/tasks");

const app = express();
const port = 5000;
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/api/v1/tasks", tasksRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log("Server listening to port 5000."));
  } catch (error) {
    console.log(error);
  }
}

start()