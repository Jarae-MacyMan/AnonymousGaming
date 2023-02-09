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
    static async getFriendReq(req, res){
        const userId = req.params.userId
        const otherUserId = req.params.otherUserId
        // console.log(userId)
        // console.log(otherUserId)
        try{
            const checkFr = await pool.query("SELECT * FROM friend_status WHERE usera_id = $1 AND userb_id = $2", [userId, otherUserId])
            //console.log(checkFr.rows[0])
            res.json(checkFr.rows[0])
        }catch(error){
            console.error(error);
            res.status(500).json("server error"); 
        }
    }

    static async receiveFriendReq (req, res){
        console.log(req.user)
        const id = req.user
        try{
            const receiveFriend = await pool.query("SELECT * FROM friend_status WHERE userb_id = $1", [id])
            const stats = await pool.query("SELECT * FROM friend_status FULL OUTER JOIN users ON userb_id = user_id")
            const userInfo = {
                receiveFriend: receiveFriend.rows[0],
                stats: stats.rows,
              };
            res.json({userInfo})
        }catch(error){
            console.error(error);
            res.status(500).json("server error"); 
        }
    }



}
module.exports = friendContoller;
