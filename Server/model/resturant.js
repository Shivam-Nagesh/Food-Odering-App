import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  location: {
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
    coardinates:{
        latitude:{
            type: Decimal128,
        },
        longitude:{
            type: Decimal128,
        }
    }
  },

  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },

  rating: {
    type: Decimal128,
    min: 0,
    max: 5,
    default: 0,
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
    required: true,
  },
  
},{timestamps: true});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;