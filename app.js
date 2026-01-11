import dotenv from 'dotenv'
// if(process.env.NODE_ENV !="production"){
dotenv.config({ path: './.env' });
// }
//console.log(process.env.SECRET);
console.log("map token is -", process.env.MAP_TOKEN);

console.log(process.env.CLOUD_API_KEY);
import express, { urlencoded } from "express";
const app = express();
import mongoose from "mongoose";
import listing from "./models/listing.js";
import Reviews from "./models/review.js";
import asyncWrap from "./Utils/asyncWrap.js";
import ejsMate from "ejs-mate";
app.engine("ejs", ejsMate);
import methodOverride from "method-override";
import ExpressError from "./Utils/ExpressError.js";
import { listingSchema, reviewSchema } from "./schema.js";
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
import path from "path";
import { fileURLToPath } from "url";
import { runInNewContext } from "vm";
//import ExpressError from "../mongoEx3/ExpressError.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
import session from "express-session";
import mongoStore from "connect-mongo";
import flash from "connect-flash";
app.use(express.static(path.join(__dirname, "public")));
import listRouter from "./route/listing.js";
import reviewRouter from "./route/reviews.js";
import userRouter from "./route/user.js";

//let mongoUrl = "mongodb://127.0.0.1:27017/wanderLust" ;
let mongoUrl = process.env.ATLASDB;
import passport from "passport";
import localStrategy from "passport-local";
import User from "./models/user.js"
import { parseArgs } from "util";
import { error } from 'console';
main().then(() => {
  console.log("connected");
}).catch(() => {
  console.log("err");
})
async function main() {
  await mongoose.connect(mongoUrl);
}

const validateListing = ((req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
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
const store = mongoStore.create({
  mongoUrl: mongoUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,


})
store.on("error", () => {
  console.log("error on mongo store", error);
})
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },

};

app.use(session(sessionOptions));
app.use(flash());

//this should be after session . cuz we dont want user to enter loggin page in every page
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success") || [];
  res.locals.error = req.flash("error") || [];
  res.locals.currUser = req.user;
  next();
})

app.use("/listings", listRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
// app.get("/" , (req , res)=>{
//     res.send("you just entered the world of wanderLust") ;
// })
app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err);
  const message = err.message || "Something went wrong";
  res.render("listings/error.ejs", { message });
  //    res.status(status).send(message) ;
})
app.listen(8080, () => {
  console.log("app is listening on the port 8000");
})