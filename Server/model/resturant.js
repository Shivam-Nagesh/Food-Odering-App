import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    locations: [
      {
        address: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        coordinates: {
          latitude: {
            type: mongoose.Types.Decimal128,
          },
          longitude: {
            type: mongoose.Types.Decimal128,
          },
        },
      },
    ],

    rating: {
      type: mongoose.Types.Decimal128,
      min: 0,
      max: 5,
      default: 4.2,
    },

    menu: [
      {
        dishName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        //   category: {
        //     type: String, // e.g., 'Appetizer', 'Main Course', 'Dessert'
        //   },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],

    openingHours: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
