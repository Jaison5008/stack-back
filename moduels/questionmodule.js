var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 let questionSchema = new mongoose.Schema(
    {   title:{type:String,required:true},
        question:{type:String,required:true},
        userid:{ type:String,required:true},
        nick:{type:String,require:true},
        
        createdAt:{type:String,default:ss}
    })
    


let Question = mongoose.model('question',questionSchema);
module.exports={Question};