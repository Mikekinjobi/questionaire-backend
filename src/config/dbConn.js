const {connect} = require('mongoose');

const connectDB = async ()=>{
    try{
        await connect("mongodb+srv://admin:project123@portfolioselection.kewgk0m.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioSelection", {
        });
    } catch (err){
        console.error(err)
    }
}

module.exports = connectDB;