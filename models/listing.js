import mongoose, { mongo } from "mongoose";
import Reviews from "./review.js";

let Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    images:
        [{
            url: String,
            filename: String,

        }],
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ geometry: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    filter: {
        type: String,
        enum: ["Trending", "Rooms", "Castles", "Iconic cities", "Mountains", "Arctic", "Domes", "Beach", "Boats", "Games", "Skiing", "Farms", "Camping"],
    },
  

}
);
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Reviews.deleteMany({ _id: { $in: listing.reviews } });
    }
})
const listing = mongoose.model("listing", listingSchema);
//module.exports = listing ;
export default listing