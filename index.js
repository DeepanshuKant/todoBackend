const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const errorMiddleware = require('./middleware/error')

//Import Routes---------------------------------------->
const user = require('./routes/userRoute')
const password = require('./routes/passwordRoute')

//Creating Express App-------------------------------->
const app = express();

//use all the middleware-------------------------------->
app.use(cors({ origin: true, credentials: true, exposedHeaders: ["set-cookie"] }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({ path: './config/config.env' });

//Handling Uncaught Errors---------------------------->
process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    console.log("Shutting down...");
    process.exit(1);
})


//MongoDB Connection
const MongoDb = process.env.MONGO_URL;
mongoose.connect(MongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb Connect Successfully"))
    .catch(() => console.log("MongoDb Connect Failed"));


//All Routes Use Here------------------------------------------------------>>>
app.use('/api/v1', user);
app.use('/api/v1', password);


app.use(errorMiddleware)


//Server Port
const server = app.listen(4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})


process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);


    server.close(() => {
        process.exit(1);
    })
})
