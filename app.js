const express       = require("express"),
	  bodyParser    = require("body-parser"),
	  mongoose      = require("mongoose"),
	  passport      = require("passport"),
	  LocalStrategy = require("passport-local"),
	  Campground    = require("./models/campground"),
	  Comment       = require("./models/comment"),
	  User          = require("./models/user")
	  seedDB        = require("./seeds")

const commentRoutes    = require("./routes/comments"),
	  campgroundRoutes = require("./routes/campgrounds"),
	  indexRoutes      = require("./routes/index")

	  
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

app.use(indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments/", commentRoutes)

app.listen(3000, _ => console.log("Server listening on Port 3000"))