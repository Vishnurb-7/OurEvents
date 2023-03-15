const express = require("express");

const adminControllers = require("../controller/adminController");
const adAuthController = require("../controller/adminAuthController");
const adminAuth = require("../middleware/adminAuth")
const adminRouter = express.Router();

adminRouter.post('/addAdmin', adminControllers.addAdmin);
adminRouter.get('/userData',  adminControllers.userData);
adminRouter.get("/managerData",   adminControllers.managerData);
adminRouter.get("/approvedManagers",   adminControllers.approvedManagers);
adminRouter.get("/transactions",  adminControllers.transactions);
adminRouter.post("/approve", adminAuth.authenticateToken,   adminControllers.approve);
adminRouter.post("/reject", adminAuth.authenticateToken,  adminControllers.reject);
adminRouter.post("/blockManagers", adminAuth.authenticateToken,  adminControllers.blockManagers);
adminRouter.post("/unblockManagers",adminAuth.authenticateToken,   adminControllers.unblockManagers);
adminRouter.post("/blockUser",   adminControllers.blockUser);
adminRouter.post("/unblockUser",  adminControllers.unblockUser);
adminRouter.get("/dashboard", adminControllers.dashboard);
adminRouter.post("/adminLogout",   adAuthController.adminLogout);
adminRouter.post("/adminLogin",  adAuthController.adminLogin);

module.exports = adminRouter;