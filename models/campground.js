const mongoose = require("mongoose"),
	  Comment  = require("./comment")

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	},
	comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
	}]
})

campgroundSchema.pre("remove", async next => {
	try {
		await Comment.remove({
			_id: {
				$in: this.comments
			}
		})
		next()
	} catch (err) {
		next(err)
	}
})

module.exports = mongoose.model("Campground", campgroundSchema)