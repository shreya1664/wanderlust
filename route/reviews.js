
import express, { urlencoded } from "express";
//const app = express() ;
const router = express.Router({mergeParams : true}) ;
import asyncWrap from "../Utils/asyncWrap.js" ;
import {listingSchema,reviewSchema} from "../schema.js" ;
import ExpressError from "../Utils/ExpressError.js";
import Reviews from "../models/review.js" ;
import listing from "../models/listing.js" ;
import { loggedIn , isReviewAuthor } from "../middleware.js";
import { createReview, destroyReview } from "../controlers/review.js";

const validateReview=((req,res,next)=>{
  let {error} =   reviewSchema.validate(req.body);
   if(error){
    throw new ExpressError(400 , error);
  }else{
    next();
  }
});
router.post("/" ,loggedIn,validateReview,asyncWrap( createReview));

router.delete("/:reviewId" ,isReviewAuthor, asyncWrap(destroyReview));
    export default router ;