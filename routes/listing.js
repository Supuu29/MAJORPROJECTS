const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner,validateListing}= require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);

//new route
router.get("/new",isLoggedIn,listingController.renderNewform);

router.route("/:id").get( wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,  upload.single("listing[image]"),
validateListing,
    wrapAsync(listingController.updateListings))
    .delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
//Edit route
router.get("/:id/edit",isLoggedIn, isOwner,  wrapAsync(listingController.renderEditForm));


  router.get("/", async (req, res) => {

  const category = req.query.category;

  let listings;

  if (category) {
    listings = await Listing.find({ category: category });
  } else {
    listings = await Listing.find({});
  }

  res.render("listings/index", { listings });

});

module.exports = router;