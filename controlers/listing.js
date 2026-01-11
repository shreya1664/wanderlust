import listing from "../models/listing.js";
import dotenv from "dotenv";
dotenv.config();

 import mbxgeocoding from "@mapbox/mapbox-sdk/services/geocoding.js"  ;

 const maptoken = process.env.MAP_TOKEN ;
 const geocodingClient = mbxgeocoding({ accessToken: maptoken });


const index = async (req, res)=>{
    const allListing = await listing.find({}) ;
    res.render("./listings/index.ejs" , {allListing, fil: undefined ,searchListing :undefined}) ;
}

const renderNewForm =  (req , res)=>{
  
    res.render("./listings/new.ejs") ;
}
const showListing = async (req , res)=>{
   const {id} = req.params ; 
   let place = await listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner") ;
   if(!place){
    req.flash("error" , "that listing is no longer available");
  return  res.redirect("/listings");
   }
   res.render("./listings/show.ejs" , {place , MAPBOX_TOKEN: maptoken}) ;
}
const creatListing = async (req , res,next)=>{
  let response = await geocodingClient.forwardGeocode({
   query: req.body.list.location,
   limit: 1
 })
   .send() ;
 if (response.body.features.length > 0) {
  const coords = response.body.features[0].geometry.coordinates;
  console.log(coords);
} else {
  console.log("No results found");
}

    let url = req.file.path ; 
    let filename = req.file.filename ; 
    const item = new listing(req.body.list) ;
    console.log(item);
    item.owner = req.user._id ;
    item.image = {url , filename} ;
    item.geometry = response.body.features[0].geometry ;
    const fil = req.body.list.filter ;
    console.log(fil);
    let savedlisting = await  item.save();
    console.log(savedlisting) ;
    req.flash("success","new listing created");
    res.redirect("/listings");
    }


const showFilterListing = async(req , res) =>{
  const {fil} = req.params;
   const allListing = await listing.find({}) ;
  res.render("./listings/index.ejs" ,{fil ,allListing });
}

const searchListing = async(req,res)=>{
  const {list} = req.body ;
  console.log(list);
  const searchedListing = await listing.find({location:list});
  const allListing = await listing.find({});
  if (searchedListing.length === 0) {
    req.flash("error","no such result exist");
  
    return res.render("./listings/index.ejs", { allListing, searchedListing: [] });
}else{
  res.render("./listings/index.ejs" , {searchedListing  });
}

}

const renderEditForm =async (req , res)=>{
    const {id} = req.params ;
    const editThis =await listing.findById(id) ;
    let originalImageUrl = editThis.image.url ; 
   originalImageUrl =  originalImageUrl.replace("/upload" , "/upload/h_150,w_150,e_blur:300");
    res.render("listings/edit.ejs" , {editThis ,originalImageUrl }) ;
}

const updateListing = async (req , res)=>{
    const {id} = req.params ;
  let place =  await listing.findByIdAndUpdate(id, req.body.list);
  if(req.file){
    let url = req.file.path ; 
    let filename = req.file.filename ; 
    place.image = {url , filename} ;
    await  place.save();
  }
    req.flash("success"," listing updating");
    res.redirect(`/listings/${id}`);

}
const destroyListing = async (req ,res)=>{
    const {id} = req.params ;
    await listing.findByIdAndDelete(id) ;
     req.flash("success"," listing deleted");
    res.redirect("/listings") ;
}
export {index , showListing , renderNewForm ,creatListing ,renderEditForm , updateListing ,destroyListing ,showFilterListing , searchListing} ;