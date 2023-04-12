const express = require("express");
const cors = require("cors");
const dbconfig = require("./config/dbConfig");
require("dotenv/config")


const userRoutes = require("./router/userRouter");
const providerRoutes = require("./router/providerRouter");
const adminRoutes = require("./router/adminRouter");
const chatRouter = require("./router/chatRouter");
const messageRouter = require("./router/messageRouter");
const paymentRouter = require("./router/paymentRouter")

// ****************************************************
const app = express();
// ****************************************************

app.use(cors());

dbconfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

app.use((req, res, next) => {
    res.setHeader("Access-Contol-Allow-Orgin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});


app.use("/", userRoutes);
app.use("/provider", providerRoutes)
app.use("/admin", adminRoutes);
app.use("/chat",chatRouter)
app.use("/message", messageRouter)
app.use('/payment', paymentRouter)







  app.listen(8000, () => {
    console.log("listening to port 8000 .@@@@@@@👌😍👍😁");
  });