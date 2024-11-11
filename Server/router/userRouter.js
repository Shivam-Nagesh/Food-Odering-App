import express from "express";
import userController from "../controller/userController.js";
import validation from "../validation/formValidation.js";
import verifyJWT from "../middleware/verifyJWT.js";
import upload from "../Config/configMulter.js";
import uploadToCloudinary from "../middleware/uploadToCloudinary.js";

const router = express.Router();

router
  .route("/")
  // i am thinking that basic user may be created first and then avatar will be changed later via settings in frontend
  .post(validation.signup, userController.createNewUser)
  // edit profile all data except password and email ko update kardunga
  .put( verifyJWT, userController.updateUser )
  .delete( verifyJWT, userController.deleteUser )


router
  .route("/profilePicture")
  .patch(
    verifyJWT,
    upload.single("profilePicture"),
    uploadToCloudinary,
    userController.profilePicture
  );

export default router;
