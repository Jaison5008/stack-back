var express = require('express');
var router = express.Router();
var {Question}=require('../moduels/questionmodule');
/* GET users listing. */ 
var{validate}=require('../common/bcrypt')
router.get('/',  async function(req, res) {  
  try{
  const user=await Question.find(); 
  if(user){  
    res.status(200).send({user,message:'Question data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'Question data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:questionid',  async function(req, res) {  
  try{
  const user=await Question.findOne({_id:req.params.questionid}); 
  if(user){  
    res.status(200).send({user,message:'Question data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'Question data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});  
router.delete('/delete/:userid/:questionid',  async function(req, res) {  
  try{
  const user=await Question.findOne({userid:req.params.userid,_id:req.params.questionid}); 
  if(user){   
    await Question.deleteOne({userid:req.params.userid,_id:req.params.questionid})
    res.status(200).send({message:'question data delete sucess'})
   
  }else{  
    res.status(400).send({error:'question data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
}); 



router.post('/post',async function(req, res) {  
  try{
  const ques= await Question.create({title:req.body.title,question:req.body.question,userid:req.body.userid,nick:req.body.nick})
  
  res.status(200).send({ques,message:'question post sucess'})

  } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
}); 


router.patch('/patch/:userid/:questionid',  async function(req, res) {  
  try{
  const user=await Question.findOne({userid:req.params.userid,_id:req.params.questionid});  
  console.log(user)
  if(user){   
    user.question=req.body.question 
    
  user.save(); 
   
    res.status(200).send({user,message:'Question data save sucess'})
   
  }else{  
    res.status(400).send({error:'Question data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
}); 


module.exports = router;
