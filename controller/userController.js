const dbConnection = require("../db/dbConfig")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body

    if (!email || !password || !firstname || !lastname || !username) {
        return res.status(400).json({ msg: "Provide all necessary info" })
    }

    try {
        const [user] = await dbConnection.query(
            "SELECT username, userid FROM users WHERE username = ? OR email = ?",
            [username, email]
        )

        if (user.length > 0) {
            return res.status(200).json({ msg: "already registered" })
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "password must be at least 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await dbConnection.query(
            "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
            [username, firstname, lastname, email, hashedPassword]
        )

        return res.status(201).json({ msg: "user created" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "sth went wrong try again later" })
    }
}

async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: "please enter all the required fields" })
    }

    try {
        const [user] = await dbConnection.query(
            "SELECT username, userid, password FROM users WHERE email = ?",
            [email]
        )

        if (user.length === 0) {
            return res.status(400).json({ msg: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" })
        }

        const username = user[0].username
        const userid = user[0].userid

        const token = jwt.sign({ username, userid }, process.env.TOKEN,{ expiresIn: "1d" })

        return res.status(200).json({ msg: "user login successful", token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "server error", error: error.message })
    }
}

async function checkUser(req, res) {
    const username = req.user.username
    const userid = req.user.userid
    res.status(200).json({ msg: "valid user", username, userid })
}

module.exports = { register, login, checkUser }
