const express       = require("express"),
	  bodyParser    = require("body-parser"),
	  mongoose      = require("mongoose"),
	  passport      = require("passport"),
	  LocalStrategy = require("passport-local"),
	  Campground    = require("./models/campground"),
	  Comment       = require("./models/comment"),
	  User          = require("./models/user")
	  seedDB        = require("./seeds")

	  
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
seedDB()

app.use(require("express-session")({
	secret: "This is the hash code",
	resave: false,
	saveUninitialized: false
}))

app.use((req, res, next) => {
	res.locals.currentUser = req.user
	next()
})

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next()
	res.redirect("/login") 
}


app.get("/", (req, res) => {
	res.render("landing")
})

app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) console.log(err)
		else res.render("campgrounds/index", {campgrounds})
	})
})

app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new")
})

app.post("/campgrounds", (req, res) => {
	Campground.create({
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description
	}, (err, newCamp) => {
		if (err) console.log(err)
		else res.redirect("/campgrounds")
	})
	
})

app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
		if (err) console.log(err)
		else res.render("campgrounds/show", {campground})
	})
})

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err)
			redirect("/campgrounds")
		} else res.render("comments/new", {campground})

	})
})

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) console.log(err)
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) console.log(err)
				else {
					campground.comments.push(comment)
					campground.save()
					res.redirect(`/campgrounds/${campground._id}`)
				}
			})
		}
	})
})

app.get("/register", (req, res) => {
	res.render("register")
})

app.post("/register", (req, res) => {
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

app.get("/login", (req, res) => {
	res.render("login")
})

app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}
)) 

app.get("/logout", (req, res) => {
	req.logout()
	res.redirect("/campgrounds")
})





app.listen(3000, _ => console.log("Server listening on Port 3000"))