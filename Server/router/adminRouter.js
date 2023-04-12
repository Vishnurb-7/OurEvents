const express = require("express");
const adminControllers = require("../controller/adminController");
const adAuthController = require("../controller/adminAuthController");
const adminAuth = require("../middleware/adminAuth")
const adminRouter = express.Router();

adminRouter.post('/addAdmin',adminControllers.addAdmin);
adminRouter.get('/userData', adminAuth.authenticateToken , adminControllers.userData);
adminRouter.get("/managerData",adminAuth.authenticateToken ,   adminControllers.managerData);
adminRouter.get("/approvedManagers", adminAuth.authenticateToken ,  adminControllers.approvedManagers);
adminRouter.get("/transactions",adminAuth.authenticateToken ,  adminControllers.transactions);
adminRouter.post("/approve",adminAuth.authenticateToken ,    adminControllers.approve);
adminRouter.post("/reject",adminAuth.authenticateToken ,   adminControllers.reject);
adminRouter.post("/blockManagers",adminAuth.authenticateToken , adminControllers.blockManagers);
adminRouter.post("/unblockManagers",adminAuth.authenticateToken , adminControllers.unblockManagers);
adminRouter.post("/blockUser",adminAuth.authenticateToken ,   adminControllers.blockUser);
adminRouter.post("/unblockUser",adminAuth.authenticateToken ,  adminControllers.unblockUser);
adminRouter.get("/dashboard", adminControllers.dashboard);
adminRouter.post("/adminLogout",   adAuthController.adminLogout);
adminRouter.post("/adminLogin",  adAuthController.adminLogin);

module.exports = adminRouter;