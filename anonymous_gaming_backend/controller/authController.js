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

            //const default = await pool.query("SET games_won = coalesce(games_won, 0) + 1")

            const token = generateToken(newUser.rows[0].user_id);

            return res.status(201).send({token});
        } catch(error) {
            console.error(error);
            return res.status(500).send("This email is already in use");
        }
    }

    static async getLogin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

            if (user.rows.length === 0) {
                return res.status(401).json("email is incorrect");
            }

            const validPassword = await bcrypt.compare(password, user.rows[0].password);

            if (!validPassword) {
                return res.status(401).json("password is incorrect");
            }

            const token = generateToken(user.rows[0].user_id);

            return res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }
    static async getVerified (req, res) {
        try {
            return res.json(true);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Server Error");
        }
    }



   

}

module.exports = authContoller;

