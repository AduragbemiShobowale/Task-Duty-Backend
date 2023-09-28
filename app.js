require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const taskRouter = require("./routes/taskRouter.js");
const notFound = require("./middlewares/notFound.js");

app.use(express.json()); //allows access to the req.body in our app

app.use("/api/task", taskRouter);

app.use(notFound);

// app.listen(port, () => {
//   console.log(`Server running on Port ${port}`);
// });

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); //What went on hear clarity needed
    console.log("DB Connected!");
    app.listen(port, () => {
      console.log(`Server running on Port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();
