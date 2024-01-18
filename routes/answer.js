var express = require('express');
var router = express.Router();
var {Answer}=require('../moduels/answermodule'); 
//var {validate}=require('../common/bcrypt')
/* GET users listing. */ 

router.get('/get',  async function(req, res) {  
  try{
  const user=await Answer.find(); 
  if(user){  
    res.status(200).send({user,message:'Answer data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'Answer data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:questionid', async function(req, res) {  
  try{
  const user=await Answer.find({questionid:req.params.questionid }); 
  if(user){  
    res.status(200).send({user,message:'Answer data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'Answer data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});  
router.delete('/delete/:userid/:questionid/:answerid',  async function(req, res) {  
  try{
  const user=await Answer.findOne({userid:req.params.userid, questionid:req.params.questionid,
    
    _id:req.params.answerid}); 
  if(user){   
    await Answer.deleteOne({userid:req.params.userid,questionid:req.params.questionid, _id:req.params.answerid})
    res.status(200).send({message:'answer data delete sucess'})
   
  }else{  
    res.status(400).send({error:'answer data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
}); 



router.post('/post', async function(req, res) {  
  try{
  const ques= await Answer.create({userid:req.body.userid,questionid:req.body.questionid,answer:req.body.answer})
  
  res.status(200).send({ques,message:'answer post sucess'})

  } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
}); 


router.patch('/patch/:userid/:questionid/:answerid',  async function(req, res) {  
  try{
  const user=await Answer.findOne({
    userid:req.params.userid,  
    questionid:req.params.questionid,
    _id:req.params.answerid});  
  console.log(user)
  if(user){   
    user.answer=req.body.answer
    
  user.save(); 
   
    res.status(200).send({user,message:'Answer data save sucess'})
   
  }else{  
    res.status(400).send({error:'Answer data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
}); 


module.exports = router;
