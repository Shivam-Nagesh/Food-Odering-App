import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  orderItems: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem", // Reference to the FoodItem schema
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  // locality toe useEffect() se bhi le sakta hu
  // thinking of giving two option like usersaved address/current new address(typed)
  // will not integrate google api with it to calculate distance but lets see
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "on the way", "delivered", "canceled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["credit card", "upi", "cash on delivery"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  deliveryTime: {
    type: Date,
  },

},{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
