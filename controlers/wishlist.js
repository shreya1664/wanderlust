import Wishlist from "../models/wishlist.js";
const renderWishList = async(req,res)=>{
  const{placeId} = req.params ;
  const places = await Wishlist
    .findOne({ user: req.user._id })
    .populate("listings");
  res.render("listings/wishlist.ejs",{places,placeId});
}

const saveWish =async (req ,res)=>{
    const{placeId} = req.params ;
      const userId = req.user._id;
      let places = await Wishlist.findOne({
  user: userId,
});
 if (!places) {
    places = new Wishlist({
      name: "My Wishlist",
      user: userId,
      listings: [placeId]
    }); 
     await places.save();
    return res.redirect(`/wishlist/${placeId}`);
  }else{
    places.listings.push(placeId);
    await places.save();
     return res.redirect(`/wishlist/${placeId}`);

  }

  
}
export {renderWishList , saveWish } ;