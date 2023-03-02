const express = require("express");
const userControllers = require("../controller/userController");
const userAuthController = require("../controller/userAuthController");
const { authenticateToken } = require("../middleware/userAuth");

const userRouter = express.Router();

userRouter.post('/googleSignup', userControllers.googleSignup);
userRouter.post('/signup', userControllers.signup);
userRouter.post('/otpVerify', userControllers.otpVerify);
userRouter.post('/resendOtp', userControllers.resendOtp);
userRouter.post('/login', userAuthController.login);
userRouter.post('/googleLogin', userAuthController.googleLogin);
userRouter.post('/logout', userAuthController.logout);
userRouter.post('/userToken', userAuthController.userToken);
userRouter.post('/forgotPassword', userControllers.forgotPassword);
userRouter.post('/ChangePasswordOtp', userControllers.ChangePasswordOtp);
userRouter.post('/changePassword', userControllers.changePassword);
userRouter.get('/findManagers', userControllers.findManagers);
userRouter.get('/managerProfile',  userControllers.managerProfile);



module.exports = userRouter;