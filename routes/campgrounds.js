const express    = require("express"),
	  router     = express.Router(),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment")

router.get("/", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) console.log(err)
		else res.render("campgrounds/index", {campgrounds})
	})
})

router.get("/new", (req, res) => {
	res.render("campgrounds/new")
})

router.post("/campgrounds", (req, res) => {
	Campground.create({
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description
	}, (err, newCamp) => {
		if (err) console.log(err)
		else res.redirect("/campgrounds")
	})
	
})

router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
		if (err) console.log(err)
		else res.render("campgrounds/show", {campground})
	})
})

module.exports = router