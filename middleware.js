import listing from "./models/listing.js";
import Reviews from "./models/review.js";

const loggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in");
    return res.redirect("/login");
  }
  next();
};

const savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  let list = await listing.findById(id);
  if (!list.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you dont have access to manupulate this");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  let review = await Reviews.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you dont have access to manupulate this");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
export { loggedIn, savedRedirectUrl, isOwner, isReviewAuthor };

