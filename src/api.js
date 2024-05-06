const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, "/data/answers.json");

const loadData = () => {
    try {
        const dataJSON = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(dataJSON);
    } catch (error) {
        console.error("Error loading data:", error);
        return { all: [] };
    }
}

const saveData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, '\t'));
        return true;
    } catch (error) {
        console.error("Error saving data:", error);
        return false;
    }
}

const addData = (req, res) => {
    try {
        const data = loadData();
        const newData = {
            ... req.body
        };
        data.all.push(newData);
        if (saveData(data)) {
            res.status(200).send({ added: newData });
        } else {
            res.status(500).send("Cannot add new data");
        }
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).send(error.message);
    }
}

const getAllData = (req, res)=> {
    try{
    const allAnswers = loadData();
    res.status(200).send(allAnswers)
    }
    catch(error) {
        console.error("cannot get data")
        res.status(500).send(error.message)
    }


}

const updateData = (req, res)=> {
    try{
    const allAnswers = loadData();
    const id = req.params.id;
    const answer = allAnswers.all.find(answer => answer.answerId == id);
    const update = {...answer, ...req.body}
    const newAnswers = allAnswers.all.map(answer =>{
        if(answer.answerId == id) return update;
        return answer
    })

    allAnswers.all = newAnswers;

    if (saveData(allAnswers)) {
        res.status(200).send(update);
    } else {
        res.status(500).send("Cannot update data");
    }
    
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteAll = (req, res)=> {
    try {
        const allAnswers = loadData();
        allAnswers.all = [];
        if (saveData(allAnswers)) {
            res.status(200).send(allAnswers);
        } else {
            res.status(500).send("Cannot delete data");
        }
    }catch (error){
        res.status(500).send("error on delete");
    }
}

app.post('/addData', addData);
app.get('/allData', getAllData);
app.patch('/update/:id', updateData)
app.delete('/deleteAll', deleteAll)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});