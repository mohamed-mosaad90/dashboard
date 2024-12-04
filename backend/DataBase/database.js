
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://moustafaazouz123456:mongo1234@cluster11.oeqhpg6.mongodb.net/test?")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
;


