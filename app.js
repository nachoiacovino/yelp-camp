const express = require("express"),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  app = express()

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
})

const Campground = mongoose.model("Campground", campgroundSchema)

app.get("/", (req, res) => {
	res.render("landing")
})

app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) console.log(err)
		else res.render("index", {campgrounds})
	})
	
})

app.get("/campgrounds/new", (req, res) => {
	res.render("new")
})

app.post("/campgrounds", (req, res) => {
	Campground.create({
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description
	}, (err, newCamp) => {
		if (err) console.log(err)
		else res.redirect("index")
	})
	
})


app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) console.log(err)
		else res.render("show", {campground})
	})
})




app.listen(3000, _ => console.log("Server listening on Port 3000"))