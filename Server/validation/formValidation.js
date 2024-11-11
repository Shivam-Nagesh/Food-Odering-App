import { body, validationResult } from "express-validator";

const login = [
  body("email")
    .trim().toLowerCase()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid Email is required"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be 8 characters long"),

  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json( { message: "all feilds requied and password must be 8 characters long without space" } );
    next();
  }
];

const signup = [

    body('fullName')
    .trim()
    .notEmpty().withMessage('Full Name is reuired')
    .matches(/^[A-Za-z\s]+$/).withMessage('Full Name should contain only letters and spaces'),

    body("email")
    .trim().toLowerCase()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid Email is required"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be 8 characters long"),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be exactly 10 digits'),

  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json( { message: "all feilds requied and password must be 8 characters long without space" } );
    next();
  }
]

export default { login, signup };