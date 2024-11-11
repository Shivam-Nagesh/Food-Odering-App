import express from "express";
import authController from '../controller/authController.js';
import validations from '../validation/formValidation.js';
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router
    .route("/login")
    .get(verifyJWT,(req,res)=>{
        res.status(200).json({user:{...req.accessToken}});
    })
    .post(validations.login, authController.login)

router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;