import express, { urlencoded } from "express";
const router = express.Router() ;
import User from "../models/user.js" ;
//import user from "../models/user.js";
import asyncWrap from "../Utils/asyncWrap.js";
import passport from "passport";
import { savedRedirectUrl , loggedIn} from "../middleware.js";
import { signup ,renderSignupForm ,renderLoginForm ,login ,logOut } from "../controlers/user.js";


router.route("/signup")
.get(renderSignupForm) 
.post(asyncWrap(signup));



router.route("/login")
.get( renderLoginForm) 
.post(
  
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  asyncWrap(login)
);

router.get("/logout" , logOut) ;

export default router ;
