const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee")
const Selection = require("../models/Selection") 

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
        correctAnswers,
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

  const getIndex = async (req, res) => {
    try {
      const index = await Selection.findOne({_id: "664903425dac877380587ba6"});
      res.status(200).send(index)
    } catch (error) {
      res.status(500).send({error})
    }
  }

  const postIndex = async (req, res)=> {
      try {
        const {index} = req.body;
          const result = await Selection.create({
            index
          })
          res.status(200).send({added: result})
      } catch (error) {
        res.status(500).send({error})
      }
  }

  const indexUpdate = async (req, res)=> {
    const id = "664903425dac877380587ba6";
    const {index} = req.body
    try {
      const result = await Selection.findOneAndUpdate({_id: id}, {index})
      res.status(200).send({updated: result});
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  router.post("/addData", addData);
  router.get("/allData", getAllData);
  router.patch("/update/:id", updateData);
  router.delete("/deleteAll", deleteAll);
  router.delete("/delete/:id", deleteOne)
  router.get("/getIndex", getIndex)
  router.post("/postIndex", postIndex)
  router.patch("/updateIndex", indexUpdate)
  
  module.exports = router;