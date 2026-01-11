import mongoose, { mongo } from "mongoose" ;
let Schema = mongoose.Schema ;
//import passportlocalmongoose from "passport-local-mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const  userSchema = new Schema({
    email :{
        type:String , 
        require:true ,
    }
});



userSchema.plugin(passportLocalMongoose.default);
export default mongoose.model("User", userSchema);