const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment   = require("./models/comment");
 
const seeds = [
    {
        name: "Hlid Cottages", 
        image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "The site is on the northern shore of lake Mývatn, right beneath the airport. We are situated about one kilometer away from the lakeside, in the middle of a 300 years old lava field and with a fantastic view over the lake. On the campground we offer good facilities for tents and trailers. Electricity is accessible and warm showers are free of charge for guests. Hotel-accommodation in nine small double rooms with made up beds and private bathrooms, breakfast included. Cottages are two houses, 50 m² each with 22 m² sleeping loft. Two bedrooms, bathroom, kitchen and dining room. The guesthouse has 13 rooms, each with bunk beds for 4 people. One big kitchen is in the house and a dining room with a beautiful view over the surrounding lava. Showers and toilets are shared. The huts/cottages are 9 m², each with two beds, and guests can use all facilities in the guesthouse, which is 200 m away. One hut is bigger or 14m2. You can rent bikes for either one day or ½ a day. Maps with hiking and bike routes are available from our service center. A wonderfully scenic 37 km long country road runs around the lake, ideal for biking. You can book a riding tour on an Icelandic horse with us and we will take you through the stunning surroundings of lake Mývatn, ranging from one and up to several hours. "
    },
    {
        name: "British Columbia", 
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "In British Columbia, we are fortunate to have more than 1,000 provincial parks and recreation sites, seven national parks, and hundreds of private campgrounds and RV sites. That alone can feel overwhelming, but camping is one of the most Canadian experiences you can have. If you’ve never been, or if you’re just starting to explore what camping is all about, here are a few helpful tips to get your stakes in the ground."
    },
    {
        name: "Flaming Gorge Reservoir", 
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Flaming Gorge is famous for its trophy lake trout. Good number of 30+ pound fish are caught each year. The Utah record went 51 lb 8 oz, and there may yet be a bigger one swimming in the reservoir. Fishing is also very good for rainbows, brown trout, kokanee salmon and smallmouth bass. "
    },
	{
        name: "Sierra National Forest", 
        image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Sierra National Forest is a U.S. National Forest located on the western slope of central Sierra Nevada in Central California and bounded on the northwest by Yosemite National Park and the south by Kings Canyon National Park. The forest is known for its mountain scenery and natural resources. Forest headquarters are located in Clovis, California. There are local ranger district offices in North Fork and Prather. "
    }
]
 
const seedDB = async () => {
    try {
        await Campground.deleteMany({})   
        await Comment.deleteMany({})

        for (const seed of seeds) {
            let campground = await Campground.create(seed)
            let comment = await Comment.create({
                text: "This place is great, but I wish there was internet",
                author: "Homer"
            })
            campground.comments.push(comment)
            campground.save()
        }
    } catch (err) {
        console.log(err)
    }
}

 
module.exports = seedDB