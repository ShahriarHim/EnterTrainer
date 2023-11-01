const express = require("express");
const router = express.Router();
const Restaurant = require("../model/restaurantSchema");
const RestaurantDetails = require("../model/RestaurantDetails");

const upload = require("../multerConfig"); // Import multer configuration

router.post("/create", upload.single("image"), async (req, res) => {
  //http://localhost:5000/restaurant/create
  const { rest_name, type, name, location, contact, restaurantAvailability } =
    req.body;
  const image = req.file.filename; // Get the uploaded image filename

  try {
    const existingRestaurant = await Restaurant.findOne({ name });

    if (existingRestaurant) {
      return res
        .status(422)
        .json({ error: "Restaurant with the same unique_ID already exists" });
    }

    const restaurant = new Restaurant({
      rest_name,
      type,
      image,
      name,
      location,
      contact,
      restaurantAvailability,
    });
    const savedRestaurant = await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.get('/cafe', async (req, res) => {
  const type = 'cafe';
  try{
      const cafeRestaurants = await Restaurant.find({ type: type });
      console.log(cafeRestaurants);
      res.status(200).json(cafeRestaurants);
    }catch (error){
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }


});

router.get("/all", async (req, res) => {
  //http://localhost:5000/restaurant/all
  try {
    const restaurants = await Restaurant.find();
    console.log(restaurants);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/createdetails", async (req, res) => {
  // http://localhost:5000/restaurant/createdetails
  const { res_id, type, deco_desc, ent_name, ent_desc, deco_cost, ent_cost } =
    req.body;

  try {
    // Check if the provided res_id exists in the Restaurant collection
    const existingRestaurant = await Restaurant.findOne({ name: res_id });

    if (!existingRestaurant) {
      return res
        .status(422)
        .json({ error: "Restaurant does not exist for the provided res_id" });
    }

    const restaurantDetails = new RestaurantDetails({
      res_id: existingRestaurant._id, // Use the ObjectId of the existing restaurant
      type,
      deco_desc,
      ent_name,
      ent_desc,
      deco_cost,
      ent_cost,
    });

    const savedDetails = await restaurantDetails.save();

    res.status(201).json({
      success: true,
      message: "Restaurant details created successfully",
      details: savedDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// {
//   "res_id": "mabaeragef",
//   "deco_name": "Decoration Name",
//   "deco_desc": "Decoration Description",
//   "ent_name": "Entertainment Name",
//   "ent_desc": "Entertainment Description",
//   "deco_cost": 100,
//   "ent_cost": 200
// }
router.get("/restaurantdetails", async (req, res) => {
  try {
    const restaurantDetails = await RestaurantDetails.find();
    res.status(200).json(restaurantDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Import necessary modules and models

router.get("/alltypes", async (req, res) => {
  try {
    const restaurantTypes = await RestaurantDetails.aggregate([
      {
        $lookup: {
          from: "restaurants", // The name of the Restaurant collection
          localField: "res_id",
          foreignField: "_id",
          as: "restaurantInfo",
        },
      },
      {
        $group: {
          _id: "$type",
          details: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(restaurantTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add this route handler after the existing route handlers

module.exports = router;
