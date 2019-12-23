const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Question = mongoose.model("Question");
var cnt = 0;




router.get("/",(req,res) =>
{
  res.render("queston/add.hbs",{
    viewTitle: "Insert Question and Answer"
  });
});


router.post("/",(req,res) =>{
if(req.body._id == "")
  insertRecord(req,res);

  else
  updateRecord(req,res);
});




function insertRecord(req,res){

  //question.fullName = req.body.fullName;
  //question.shortName = req.body.shortName;
  st=req.body.fullName;
  vt=req.body.shortName;
  if(vt == ''|| st ==''){
    res.render("queston/add.hbs",{
      viewTitle: "Insert Question and Answer"

    });

 res.send(500,'showAlert')

  }
  else {
    var question = new Question();
    question.fullName = req.body.fullName;
    question.shortName = req.body.shortName;
      question.save((err,doc)=>{
        if(!err){
            cnt = cnt+1;
          res.redirect("list");




        }

          else{
            console.log("Error due to insertion" + err);
          }

      });

}

}

function updateRecord(req,res){
  Question.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
  if(!err){
    res.redirect("list");
  }
  else{
    console.log("Error during adding record id" + err);
  }
});
}

router.get("/list",(req,res)=>{
  Question.find((err,docs)=>{
    if(!err){
      res.render("queston/list",{
         list:docs,
         nos:cnt
      });
    }
    else{
      console.log(" error is "+ err);
    }
  });
});
router.get("/:id",(req,res)=>{
  Question.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.render("queston/add",{
        viewTitle:"Update Question",
        question : doc
      });
    }

  });
});

router.get('/delete/:id', (req, res) => {
    Question.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Error in question delete :' + err); }
    });
});





module.exports = router;
