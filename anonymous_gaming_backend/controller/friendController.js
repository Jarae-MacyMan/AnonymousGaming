const pool = require('../dbconfig')



class friendContoller {
    static async sendFriendReq(req, res) {
        console.log(req.user)
        const userId = req.body.userID
        const otherUserId = req.body.otherUserID
        try{
            const addFr = await pool.query ("INSERT INTO friend_status (usera_id, userb_id, status) VALUES ($1, $2, false) RETURNING *", 
            [userId, otherUserId])
            res.json(addFr.rows[0]);
        }catch(error){
            console.error(error);
            res.status(500).json("server error");
        }
    }

}
module.exports = friendContoller;
