import mongoose, { mongo } from "mongoose" ;
let Schema = mongoose.Schema ;

let reviewSchema = new Schema({
    comment : String ,
    rating :{
        type:Number ,
        max :5 ,
        min :1
    },
    createAt :{
        type:Date , 
        default : Date.now()
    },
    author:{
        type : Schema.Types.ObjectId ,
        ref : "User",
      
    }
});
const Reviews =  mongoose.model("Reviews" , reviewSchema);

export default Reviews ;