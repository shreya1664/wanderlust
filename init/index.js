import mongoose from "mongoose";
import initData from "./data.js" ;
import listing from "../models/listing.js" ;

let mongoUrl = "mongodb://127.0.0.1:27017/wanderLust" ;

main().then(()=>{
    console.log("connected") ;
}).catch(()=>{
    console.log("err");
})
 async function main() {
    await mongoose.connect(mongoUrl) ;
}

const initDb = async()=>{
    await listing.deleteMany({}) ;
    initData.data = initData.data.map((obj)=>(({...obj,owner :"6957f914cdeb0351a973d49b"})));
    await listing.insertMany(initData.data) ;
    console.log("data was initialised") ;
}
 initDb() ;