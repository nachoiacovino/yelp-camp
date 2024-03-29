const express    = require("express"),
	  router     = express.Router(),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment")

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next()
	res.redirect("/login") 
}

const checkCampgroundOwner = (req, res, next) => {
	if(req.isAuthenticated()) {
		Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
			if (err) res.redirect("back")
			else {
				if (campground.author.id.equals(req.user._id)) next()
				else res.redirect("back")
			}
		})
	} else {
		res.redirect("back")
	}
}

router.get("/", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) console.log(err)
		else res.render("campgrounds/index", {campgrounds})
	})
})

router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new")
})

router.post("/", isLoggedIn, (req, res) => {
	Campground.create({
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username
		}
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

router.get("/:id/edit", checkCampgroundOwner, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		res.render("campgrounds/edit", {campground})
	})
})

router.put("/:id", checkCampgroundOwner, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if (err) res.redirect("/campgrounds/" + campground._id)
		else res.redirect("/campgrounds/" + campground._id)
	})
})

router.delete("/:id", checkCampgroundOwner, (req, res, next) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) return next(err)
		else {
			campground.deleteOne()
			// req.flash('success', 'Campground deleted successfully!')
			res.redirect("/campgrounds")
		}
	})
})

module.exports = router