import Reviews from "../models/review.js" ;
import listing from "../models/listing.js" ;

const createReview = async(req ,res)=>{
    let list =await listing.findById(req.params.id);
    let newReview = new Reviews( req.body.review );
    newReview.author = req.user._id ; 
    list.reviews.push(newReview);
    await list.save();
    await newReview.save();
     req.flash("success","new review added");
    res.redirect(`/listings/${list._id}`);
}

const destroyReview = async (req ,res)=>{
    let {id , reviewId} = req.params ;
    await listing.findByIdAndUpdate(id, {$pull:{reviews : reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
 }

export {createReview , destroyReview} ;