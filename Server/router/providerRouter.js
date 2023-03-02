const express = require("express");
const { check } = require("express-validator");
const providerControllers = require("../controller/providerController");

const providerAuthController = require("../controller/providerAuthController")
const { authenticateToken } = require("../middleware/managerAuth");


const providerRouter = express.Router();

providerRouter.post("/managerLogin", providerAuthController.login);
providerRouter.post("/signupEmail",providerControllers.signupWithEmail);
providerRouter.post("/otpVerify", providerControllers.otpVerify);
providerRouter.post("/resendOtp", providerControllers.resendOtp);
providerRouter.post("/managersLogout", providerAuthController.logout);
providerRouter.post("/managersToken", providerAuthController.managersToken);
providerRouter.post("/forgotPassword", providerControllers.forgotPassword);
providerRouter.post("/ChangePasswordOtp", providerControllers.ChangePasswordOtp);
providerRouter.post("/changePassword", providerControllers.changePassword);
providerRouter.post("/providerDetails", providerControllers.providerDetails);
providerRouter.post("/addService",  providerControllers.addService);
providerRouter.post("/removeService",  providerControllers.removeService);
providerRouter.post("/addimage", providerControllers.addImage);


module.exports = providerRouter;