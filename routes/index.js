const express  = require("express"),
	  router   = express.Router(),
	  passport = require("passport"),
	  User     = require("../models/user")


const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next()
	res.redirect("/login") 
}

router.get("/", (req, res) => {
	res.render("landing")
})

router.get("/register", (req, res) => {
	res.render("register")
})

router.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			console.log(err)
			return res.render("register")
		}
		passport.authenticate("local")(req, res, _ => {
			res.redirect("/campgrounds")
		})
	})
})

router.get("/login", (req, res) => {
	res.render("login")
})

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}
)) 

router.get("/logout", (req, res) => {
	req.logout()
	res.redirect("/campgrounds")
})

module.exports = router