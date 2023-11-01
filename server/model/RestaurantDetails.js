const mongoose = require("mongoose");

const restaurantDetailsSchema = new mongoose.Schema({
  res_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  deco_desc: String,
  ent_name: {
    type: String,
    required: true,
  },
  ent_desc: String,
  deco_cost: {
    type: Number,
    required: true,
  },
  ent_cost: {
    type: Number,
    required: true,
  },
});

const RestaurantDetails = mongoose.model(
  "RestaurantDetails",
  restaurantDetailsSchema
);
module.exports = RestaurantDetails;
