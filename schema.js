import Joi from "joi";
//import list from "./models/listing.js";

const listingSchema = Joi.object({
    list: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().allow("", null),
    }).required(),
});


const reviewSchema = Joi.object({
    review : Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment :Joi.string().required(),
    }).required(),
});
export {reviewSchema , listingSchema};