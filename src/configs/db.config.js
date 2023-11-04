const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGODB)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
