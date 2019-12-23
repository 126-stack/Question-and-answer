const mongoose = require("mongoose");
var questionSchema = new mongoose.Schema({
  fullName:{
    type:String
  },
  shortName:{
    type:String
  }

});



mongoose.model("Question",questionSchema);
