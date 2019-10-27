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

//Campground.create({
//	name: "Mountain Goat's", image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
//}, (err, campground) => {
//	if (err) console.log(err)
//	else console.log(campground)
// })

//

app.get("/", (req, res) => {
	res.render("landing")
})

app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) console.log(err)
		else res.render("campgrounds", {campgrounds})
	})
	
})

app.get("/campgrounds/new", (req, res) => {
	res.render("newCamp")
})

app.post("/campgrounds", (req, res) => {
	// campgrounds.push({name: req.body.name, image: req.body.image})
	Campground.create({
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description
	}, (err, newCamp) => {
		if (err) console.log(err)
		else res.redirect("campgrounds")
	})
	
})

app.get("/campgrounds/:id", (req, res) => {
	// const detailCamp = req.body
	Campground.find({
		id: req.params.id
	}), (err, detailCamp) => {
		if (err) console.log(err)
		else res.render("detailCamp", {detailCamp})
	}
	
})




app.listen(3000, _ => console.log("Server listening on Port 3000"))