 var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 let userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{ type:String,required:true},
        
        mobile:{type:String,default:'000-000-0000'},
        password:{type:String,required:true},
        role:{type:String,default:'user'}, 
        token:{type:String,default:null},
        createdAt:{type:String,default:ss} , 
        updateAt:{type:String,default:ss}
    })
    


let UserModel = mongoose.model('user',userSchema);
module.exports={UserModel};