const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee")

const addData = async (req, res) => {
    try {
      const {
        age,
        answerId,
        createdAt,
        education,
        employment,
        gender,
        answers,
        location,
        managerId,
        timeSpent,
        eValue,
        numberOfAnsweredQuestions,
        numberOfSkippedQuestions,
        result,
        skippedQuestions,
        totalPossibleEvalue,
        totalQuestions,
        percentageCorrectAnswers,
        percentageSkippedQuestions
      } = req.body;
      const postResult = await Employee.create({
        age,
        answerId,
        createdAt,
        education,
        employment,
        gender,
        location,
        managerId,
        timeSpent,
        answers,
        eValue,
        numberOfAnsweredQuestions,
        numberOfSkippedQuestions,
        result,
        skippedQuestions,
        totalPossibleEvalue,
        totalQuestions,
        percentageCorrectAnswers,
        percentageSkippedQuestions
      });
      console.log(postResult)
      res.status(200).send({added: postResult});
    } catch (error) {
      console.error("Error adding data:", error);
      res.status(500).send(error.message);
    }
  };
  
  const getAllData = async (req, res) => {
    try {
      const allAnswers = await Employee.find({});
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
  
  
              await Employee.updateOne({answerId: [id]}, 
                newUpdate).then(result => {
                  res.status(200).json({updated: result});
                });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const deleteAll = async (req, res) => {
    try {
      await Employee.deleteMany({})
      res.status(200).send("deleted all data")
    } catch (error) {
      res.status(500).send("error on delete");
    }
  };
  
  const deleteOne = async (req, res) => {
      const id = req.params.id
      try {
        const result = await Employee.deleteOne({answerId: id})
        res.status(200).json({deleted: result})
      } catch (error) {
        res.status(500).send("error on delete");
      }
    };
  
  router.post("/addData", addData);
  router.get("/allData", getAllData);
  router.patch("/update/:id", updateData);
  router.delete("/deleteAll", deleteAll);
  router.delete("/delete/:id", deleteOne)
  
  module.exports = router;