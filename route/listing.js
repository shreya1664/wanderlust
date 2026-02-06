import express, { urlencoded } from "express";
const router = express.Router();
import asyncWrap from "../Utils/asyncWrap.js";
import listing from "../models/listing.js";
import Reviews from "../models/review.js";
import { listingSchema, reviewSchema } from "../schema.js";

import ExpressError from "../Utils/ExpressError.js";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { isOwner, loggedIn } from "../middleware.js";
import { index, showListing, renderNewForm, creatListing, renderEditForm, updateListing, destroyListing, showFilterListing, searchListing } from "../controlers/listing.js";
import multer from "multer";
import { cloudinary, storage } from "../cloudConfig.js";
const upload = multer({ storage });


const validateListing = ((req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw new ExpressError(400, error);
  } else {
    next();
  }
});
const validateReview = ((req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
});
router.get("/new", loggedIn, renderNewForm);

router
  .post("/create", loggedIn, upload.array("images",10), validateListing,
    asyncWrap(creatListing));


router.route("/search")
  .post(asyncWrap(searchListing)),


  router.get("/", asyncWrap(index));

router.route("/:fil/show")
  .get(asyncWrap(showFilterListing));

router.route("/:id")
  .delete(loggedIn, isOwner, asyncWrap(destroyListing))
  .put(loggedIn, isOwner, upload.array("images" ,10), asyncWrap(updateListing))
  .get(asyncWrap(showListing));



router.get("/:id/edit", loggedIn, isOwner, asyncWrap(renderEditForm));

//router.get("/:placeId/:ownerId/wishlist" , (renderWishList));

//router.get("/wishlist/:placeId" ,loggedIn ,asyncWrap(renderWishList));




export default router;