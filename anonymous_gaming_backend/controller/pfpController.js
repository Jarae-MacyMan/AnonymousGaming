const pool = require('../dbconfig')


class pfpController {
    static async createPfp(req, res) {
        try {
            const createPic = await pool.query(
                "INSERT INTO file (file) VALUES ($1) RETURNING *",
                [file]
              );
              res.json(createPic.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json("server error");
        }
       
    }
}

module.exports = pfpController;
