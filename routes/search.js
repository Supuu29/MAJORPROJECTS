const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
// SEARCH ROUTE
router.get("/", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.redirect("/listings");
    }
    const listings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } }
      ]
    });
    // reuse your existing page
    res.render("listings/index", { allListings:listings });

  } catch (err) {
    console.log(err);
    res.redirect("/listings");
  }
});

module.exports = router;