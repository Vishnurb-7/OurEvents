const jwt = require('jsonwebtoken')
const { User } = require("../model/userModel")
const bcrypt = require("bcrypt");


const userToken = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email })

    let refreshTokens = user.refreshToken;


    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)
    if (!user.refreshToken.includes(refreshToken)) {
        res.sendStatus(403);


    }
    jwt.verify(refreshToken, process.env.USER_REFRESH_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);

        }

        const accessToken = generateUserAccessToken({ name: user.name })

        res.json({ accessToken: accessToken })
    })
}

const logout = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    let refreshTokens = user.refreshToken;
    const refreshTokens2 = refreshTokens.filter((token) => token !== req.body.token)

    if (refreshTokens2) {

        await User.updateOne({ _id: user._id }, { $set: { refreshToken: [] } })
        res.status(204).json({ message: "success" })

    } else {
        res.status(204).json({ message: "success" })
    }
}

const login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const data = { email: email }
    const user = await User.findOne({ email});
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (validPassword) {
          
            if(user.approved){
                const accessToken = generateUserAccessToken(data)
                const refreshToken = await jwt.sign(data, process.env.USER_REFRESH_SECRET, { expiresIn: '15d' })
    
    
                await User.updateOne({ email }, { $push: { refreshToken: refreshToken } }, { upsert: true })
              
                return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken, user: email, id: user._id })
            } else {
            
                return res.status(400).json({message:'user blocked'})
            }
        } else {
            return res.status(400).json({ message: 'invalid email or password' })
        }
    } else { 
        return res.status(400).json({ message: 'invalid email or password' }) }
}

const googleLogin = async (req, res) => {


    const email = req.body.email;
    const data = { email: email }
    const user = await User.findOne({ email, approved: true });


    if (user != null) {
        const accessToken = generateUserAccessToken(data)
        const refreshToken = await jwt.sign(data, process.env.USER_REFRESH_SECRET, { expiresIn: '15d' })


        await User.updateOne({ email }, { $push: { refreshToken: refreshToken } }, { upsert: true })

        res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken, user: email, id: user._id })

    } else {
        return res.status(403).json({ message: 'error' })
    }
}




const generateUserAccessToken = (user) => {

    return jwt.sign(user, process.env.USER_ACCESS_SECRET, { expiresIn: '5m' })
}





exports.userToken = userToken;
exports.logout = logout;
exports.login = login;
exports.googleLogin = googleLogin;
exports.generateUserAccessToken = generateUserAccessToken;