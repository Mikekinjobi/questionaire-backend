const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const Manager = require("./models/Manager");
const employeeRouter = require("./routers/employeeRouter")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/employees", employeeRouter);

const dataFilePath = path.join(__dirname, "/data/answers.json");

const loadData = () => {
  try {
    const dataJSON = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(dataJSON);
  } catch (error) {
    console.error("Error loading data:", error);
    return { all: [] };
  }
};

const saveData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, "\t"));
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

const addData = async (req, res) => {
  try {
    const {
      age,
      answerId,
      createdAt,
      education,
      employment,
      gender,
      location,
      table1Choices,
      table1Evalue,
      table1Result,
      table2Choices,
      table2Evalue,
      table2Result,
      timeSpent,
    } = req.body;
    const result = await Manager.create({
      age,
      answerId,
      createdAt,
      education,
      employment,
      gender,
      location,
      table1Choices,
      table1Evalue,
      table1Result,
      table2Choices,
      table2Evalue,
      table2Result,
      timeSpent,
    });
    console.log(result)
    res.status(200).send({added: result});
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send(error.message);
  }
};

const getAllData = async (req, res) => {
  try {
    const allAnswers = await Manager.find({});
    res.status(200).send({allData: allAnswers});
  } catch (error) {
    console.error("cannot get data");
    res.status(500).send(error.message);
  }
};

const updateData = async (req, res) => {
  try {
    const id = req.params.id;   
            let newUpdate = req.body;


            await Manager.updateOne({answerId: [id]}, 
              newUpdate).then(result => {
                res.status(200).json({updated: result});
              });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAll = async (req, res) => {
  try {
    await Manager.deleteMany({})
    res.status(200).send("deleted all data")
  } catch (error) {
    res.status(500).send("error on delete");
  }
};

const deleteOne = async (req, res) => {
    const id = req.params.id
    try {
      const result = await Manager.deleteOne({answerId: id})
      res.status(200).json({deleted: result})
    } catch (error) {
      res.status(500).send("error on delete");
    }
  };

app.post("/addData", addData);
app.get("/allData", getAllData);
app.patch("/update/:id", updateData);
app.delete("/deleteAll", deleteAll);
app.delete("/delete/:id", deleteOne)

connectDB();

const PORT = 3000;
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});