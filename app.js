const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

let campgrounds = [
		{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
		{name: "Granite Hill", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
		{name: "Mountain Goat's", image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"}
	]

app.get("/", (req, res) => {
	res.render("landing")
})

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds})
})

app.get("/campgrounds/new", (req, res) => {
	res.render("newCamp")
})

app.post("/campgrounds", (req, res) => {
	campgrounds.push({name: req.body.name, image: req.body.image})
	res.redirect("campgrounds")
})




app.listen(3000, _ => console.log("Server listening on Port 3000"))