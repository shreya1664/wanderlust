import express, { urlencoded } from "express";
import  {renderWishList,saveWish}  from "../controlers/wishlist.js";
import { isOwner, loggedIn } from "../middleware.js";
const router = express.Router();

router.get("/:placeId", loggedIn, renderWishList);

router.post("/:placeId",loggedIn, saveWish); 
export default router ;