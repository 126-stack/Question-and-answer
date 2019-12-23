const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/answerDB",  { useNewUrlParser: true });


require("./question.model");
