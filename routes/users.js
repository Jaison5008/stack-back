var express = require('express');
var router = express.Router();
var {UserModel}=require('../moduels/usermodule'); 
var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');
/* GET users listing. */ 
var{hashpassword,token,compareing}=require('../common/bcrypt');

router.get('/get',  async function(req, res) {  
  try{
  const user=await UserModel.find(); 
  if(user){  
    res.status(200).send({user,message:'user data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'user data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});   


router.get('/get/:id',  async function(req, res) {  
  try{
  const user=await UserModel.findOne(); 
  if(user){  
    res.status(200).send({user,message:'user data fetch sucess'})
   
  }else{  
    res.status(400).send({error:'user data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
});  
router.delete('/delete/:id',  async function(req, res) {  
  try{
  const user=await UserModel.findOne({_id:req.params.id}); 
  if(user){   
    await UserModel.deleteOne({_id:req.params.id})
    res.status(200).send({message:'user data delete sucess'})
   
  }else{  
    res.status(400).send({error:'user data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
}); 

router.post('/post',  async function(req, res) {  
  try{
  const users=await UserModel.findOne({email:req.body.email});  
  
  if(!users){   
    const hashed= await  hashpassword(req.body.password) 
    console.log(hashed)
   const user= await UserModel.create({name:req.body.name,email:req.body.email,password:hashed,mobile:req.body.mobile})
   
    res.status(201).send({ user,message:'user data post sucess'})

  } else{  
    res.status(401).send({error:'user data alredy post'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server error'})
  }
});  

router.post('/login',  async function(req, res) {  
  try{
  const users=await UserModel.findOne({email:req.body.email});  
  if(users){     
    const password=users.password;  
    console.log(password)
    const bodypassword=req.body.password; 
    console.log(bodypassword)
    if(await compareing(password,bodypassword)){  
    const tokens=await token ({name:users.name,role:users.role}) 
    res.status(201).send({tokens,users,message:'LOGIN SUCESS'})
   }else{ 
   throw ({error:'pls enter currect Password'})
   }
} else{  
   throw ({error:'pls enter currect email'})

  }
 } catch(error){  
   
    if(error){ 
      
      res.status(400).send({error:error})
    }
  else{
    res.status(500).send({error:'internal server error'}) 
  }
  }
}); 


router.patch('/patch/:id',  async function(req, res) {  
  try{
  const user=await UserModel.findOne({_id:req.params.id});  
  console.log(user)
  if(user){   
    user.email=req.body.email;  
    const hashed= await  hashpassword(req.body.password) 
    user.password=hashed; 
    user.name=req.body.name; 
    user.mobile=req.body.mobile;  
    user.updateAt=ss;
  user.save(); 
   
    res.status(200).send({user,message:'user data save sucess'})
   
  }else{  
    res.status(400).send({error:'user data not available'})

  }


  } catch(error){ 
    res.status(500).send({error:'internal server not available'})
  }
}); 


module.exports = router;
