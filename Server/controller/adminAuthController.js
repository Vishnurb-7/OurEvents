const jwt = require('jsonwebtoken')
const { Admin } = require("../model/adminModel")
const bcrypt = require("bcrypt");


const token = async (req, res) => {
    try {
      const admin = await Admin.findOne();
      const refreshToken = req.body.token;
  
      if (!refreshToken) {
        return res.status(401).send("Refresh token not found");
      }
  
      if (!admin.refreshToken.includes(refreshToken)) {
        return res.status(403).send("Refresh token is invalid");
      }
  
      jwt.verify(refreshToken, process.env.ADMIN_REFRESH_SECRET, (err, decodedToken) => {
        if (err) {
          return res.status(403).send("Invalid refresh token");
        }
  
        const accessToken = generateAccessToken({ name: decodedToken.name });
  
        res.json({ accessToken });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };
  

  const adminLogout = async (req, res) => {
    try {
      const admin = await Admin.findOne();
      const refreshToken = req.body.token;
  
      const newRefreshTokens = admin.refreshToken.filter((token) => token !== refreshToken);
  
      await Admin.updateOne({ name: admin.name }, { $set: { refreshToken: newRefreshTokens } });
  
      res.status(204).json({ message: "Success" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };
  
  const adminLogin = async (req, res) => {
    try {
      const { name: username, password } = req.body;
      const user = { name: username };
      const admin = await Admin.findOne({ name: username });
  
      if (!admin) {
        return res.sendStatus(403);
      }
  
      const validPassword = await bcrypt.compare(password, admin.password);
  
      if (!validPassword) {
        return res.sendStatus(403);
      }
  
      const accessToken = generateAccessToken(user);
      const refreshToken = await jwt.sign(user, process.env.ADMIN_REFRESH_SECRET, { expiresIn: "1d" });
  
      await Admin.updateOne({ name: username }, { $push: { refreshToken } }, { upsert: true });
  
      res.status(201).json({ accessToken, refreshToken, adminName: username });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };
  
const generateAccessToken = (user) => {

    return jwt.sign(user, process.env.ADMIN_ACCESS_SECRET, { expiresIn: '5m' })
}





exports.token = token;
exports.adminLogout = adminLogout;
exports.adminLogin = adminLogin;
exports.generateAccessToken = generateAccessToken;