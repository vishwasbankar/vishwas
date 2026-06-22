const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
  try {
    const token =
      req.cookies?.token ||
      req.headers?.authorization?.split(" ")[1]

    console.log("TOKEN:", token)

    if (!token) {
      return res.status(401).json({ message: "Token not provided." })
    }

    const blacklisted = await tokenBlacklistModel.findOne({ token })
    if (blacklisted) {
      return res.status(401).json({ message: "Token blacklisted" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded
    next()

  } catch (err) {
    console.log("AUTH ERROR:", err.message)
    return res.status(401).json({ message: "Invalid token." })
  }
}

module.exports = { authUser }