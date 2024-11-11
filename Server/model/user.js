import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: process.env.CLOUDINARY_DEFAULT_AVATAR,
    },
    phone: {
      type: String,
      required: true,
    },
    // later can do multiple address with tag Home, Office, etc
    address: {
      type: String,
      required: true,
    },
    location: {
      coardinates: {
        latitude: {
          type: mongoose.Types.Decimal128, // [-90, 90]
          default: -1000, //showing its not set
        },
        longitude: {
          type: mongoose.Types.Decimal128, // [-180, 180]
          default: -1000, // showing its not set
        },
      },
    },
    orderHistory: [
      // array of Order._id
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Refers to the 'Order' schema
      },
    ],
    // if the order is canceled and not paid, i.e order.status === 'canceled' && order.paymentStatus === 'unpaid'
    penalty: {
      type: Number,
      default: 0,
    },
    // role:{
    //     type: String,
    //     enum: ['USER', 'OWNER', 'DELIVERY],
    //     default: 'USER'
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
