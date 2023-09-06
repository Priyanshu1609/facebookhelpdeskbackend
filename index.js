'use-strict';
const express = require('express')
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { urlencoded } = require('body-parser');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const facebookRouter = require("./routes/facebook");

const PORT = process.env.PORT || 8800;

dotenv.config();

const uri = process.env.MONGO_URL;

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}
connect();


// Middleware
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/facebook", facebookRouter);

app.get('/', function (_req, res) {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log("Backend server is running!" + PORT);
});