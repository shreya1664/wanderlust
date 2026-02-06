import mongoose from "mongoose" ;
const wishlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listing"
    }
  ]
}, { timestamps: true });

const wishlist = mongoose.model("wishlist", wishlistSchema);

export default wishlist
