const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MONGO_URI = require('./db');
const indexRoutes = require("./routes/index.routes")
const mangaRouter = require("./routes/manga")
const loginRouter = require("./routes/loginRouter");
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
 require("./db/index");

const app = express();
// const PORT = process.env.PORT || 4000;

// Set up CORS middleware
const allowedOrigins = [process.env.ORIGIN];
const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

//Connect to MongoDB
const uri = process.env.MONGO_URI;
console.log("uri:", uri);
mongoose.connect('mongodb://localhost:27017/mangaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // createIndexes: true,
})
.then(() => {
    console.log("MongoDB database connection established successfully");
})
.catch((error) => {
    console.log(error);
})

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(express.json());

// 👇 Start handling routes here
app.use("/", indexRoutes);
app.use("/api", mangaRouter);
app.use("/api", loginRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// app.listen(PORT, () => {
//     console.log(`Server started at http://localhost:${PORT} `)
// })

module.exports = app;
