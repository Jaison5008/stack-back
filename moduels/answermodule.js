var mongoose=require('mongoose') 
 var date=require('date-and-time')  
 const now = new Date();
 const ss=date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
 
 let answerSchema = new mongoose.Schema(
    {
        answer:{type:String,required:true},
        userid:{ type:String,required:true},
        questionid:{ type:String,required:true}, 
        vote:{type:Number,default:0}, 
        voteid:{type:Array,default:1},  
        nick:{type:String,default:null},
        createdAt:{type:String,default:ss}
    })
    


let Answer = mongoose.model('answer',answerSchema);
module.exports={Answer};