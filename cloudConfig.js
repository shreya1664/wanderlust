// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
// import "./.env";
// //import cloudinary from "cloudinary" ;
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage  } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET 
   

});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats:["jpeg" , "png" , "jpg"] ,
    
  },
});

export {cloudinary , storage} ;