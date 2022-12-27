const pool = require('../dbconfig')

const bcrypt = require("bcrypt");

const {generateToken} = require("../util/jwtGenerator");

class authContoller {
    //get all posts
    static async createRegister(req, res) {
        const { username, email, password } = req.body;
        const saltRounds = 10; // Required for authentication

        try{
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            if (!username || !password || !email) {
            return res.status(404).send("Insufficient information");
            }
            const newUser = await pool.query(
                "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
                [ email, username, hashedPassword])

            const token = generateToken(newUser.rows[0].user_id);

            return res.status(201).send({token});
        } catch(error) {
            res.status(500).json({ message: err.message });
        }
    }
   

}

module.exports = authContoller;

