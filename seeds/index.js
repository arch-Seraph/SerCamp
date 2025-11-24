const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch(err => {
        console.log("Mongo Connection Error!");
        console.log(err);
    });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("database connected");
})
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '6914e83528d5d05498585a36',
            location: `${cities[randomIndex].name}, ${cities[randomIndex].state}`,
            geometry: {
                type: "Point",
                coordinates: [ 
                    cities.longitude, 
                    cities.latitude
                ]
            },  
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis distinctio similique ipsum laudantium possimus aut quasi tenetur temporibus aliquid perspiciatis sapiente tempore nam, natus ipsam?',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/drgxiqxew/image/upload/v1763229714/YelpCamp/ibdpoi8glxfridwsr2ha.png',
                  filename: 'YelpCamp/ibdpoi8glxfridwsr2ha',
                },
                {
                  url: 'https://res.cloudinary.com/drgxiqxew/image/upload/v1763229714/YelpCamp/zz9wzjgh5jm6eq0zsc6a.jpg',
                  filename: 'YelpCamp/zz9wzjgh5jm6eq0zsc6a',
                },
                {
                  url: 'https://res.cloudinary.com/drgxiqxew/image/upload/v1763229715/YelpCamp/ss8631vm39l3xzepn7uc.png',
                  filename: 'YelpCamp/ss8631vm39l3xzepn7uc',
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});