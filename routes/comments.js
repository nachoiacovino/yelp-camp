const express    = require("express"),
	  router     = express.Router({ mergeParams: true }),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment")

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next()
	res.redirect("/login") 
}

router.get("/new", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err)
			redirect("/campgrounds")
		} else res.render("comments/new", {campground})

	})
})

router.post("/", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) console.log(err)
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) console.log(err)
				else {
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					campground.comments.push(comment)
					campground.save()
					res.redirect(`/campgrounds/${campground._id}`)
				}
			})
		}
	})
})

module.exports = router