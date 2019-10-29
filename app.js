const express    = require("express"),
	  app        = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose"),
	  Campground = require("./models/campground"),
	  Comment    = require("./models/comment")
	  seedDB     = require("./seeds")

	  
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
seedDB()

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

app.get("/campgrounds/:id/comments/new", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err)
			redirect("/campgrounds")
		} else res.render("comments/new", {campground})

	})
})

app.post("/campgrounds/:id/comments", (req, res) => {
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



app.listen(3000, _ => console.log("Server listening on Port 3000"))