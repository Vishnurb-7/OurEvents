const jwt = require('jsonwebtoken')
const { Admin } = require("../model/adminModel")
const bcrypt = require("bcrypt");
const { set } = require('mongoose');

const token = async (req, res) => {
    const admin = await Admin.findOne()

    let refreshTokens = admin.refreshToken;


    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)
    if (!admin.refreshToken.includes(refreshToken)) {
        res.sendStatus(403);


    }
    jwt.verify(refreshToken, process.env.ADMIN_REFRESH_SECRET, (err, admin) => {
        if (err) {
            res.sendStatus(403);

        }

        const accessToken = generateAccessToken({ name: admin.name })

        res.json({ accessToken: accessToken })
    })
}

const adminLogout = async (req, res) => {
    const admin = await Admin.findOne()

    let refreshTokens = admin.refreshToken;
    const refreshTokens2 = refreshTokens.filter((token) => token !== req.body.token)

    if (refreshTokens2) {



        await Admin.updateOne({ name: admin.name }, { $set: { refreshToken: [] } })
        res.status(204).json({ message: "success" })

    } else { res.status(204).json({ message: "success" }) }

}

const adminLogin = async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    // console.log(req.body);
    const user = { name: username }
    const admin = await Admin.find({ name: username });

    // console.log('admin ----------'+admin)

    if (admin.length > 0) {
        const validPassword = await bcrypt.compare(password, admin[0].password);
        // console.log(validPassword)
        if (validPassword) {
            // console.log('validPassword');
            const accessToken = generateAccessToken(user)
            const refreshToken = await jwt.sign(user, process.env.ADMIN_REFRESH_SECRET, { expiresIn: '1d' })
            // console.log(accessToken,refreshToken);

            let updating = await Admin.updateOne({ name: username }, { $push: { refreshToken: refreshToken } }, { upsert: true })
            // console.log(updating)

            res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken, adminName: username })
        } else {
            // console.log('not valid pass');
            return res.sendStatus(403)
        }
    } else { 
        // console.log('error occured')
        return res.sendStatus(403) }
}

const generateAccessToken = (user) => {

    return jwt.sign(user, process.env.ADMIN_ACCESS_SECRET, { expiresIn: '5m' })
}





exports.token = token;
exports.adminLogout = adminLogout;
exports.adminLogin = adminLogin;
exports.generateAccessToken = generateAccessToken;