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
        //console.log(req.user)
        const id = req.user
        try{
            const receiveFriend = await pool.query("SELECT * FROM friend_status WHERE userb_id = $1", [id])
            const stats = await pool.query("SELECT username, user_id, profile_pic_id, status FROM friend_status FULL OUTER JOIN users ON usera_id = user_id")
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

    static async acceptFriendReq (req, res) {
        //const id = req.user
        const {id} = req.body;
        console.log(id)
        try{
            const accept = await pool.query(
            "UPDATE friend_status SET status = $1 WHERE usera_id = $2 RETURNING *" ,
            [true, id]
            );
            console.log(accept.rows[0])
            res.json(accept.rows[0])
        }catch(error){
            console.error(error);
            res.status(500).json("server error"); 
        }
    }

    static async allFriends (req, res) {
        const id = req.user
        let friendListArr = []
        try{
            const getFr = await pool.query("SELECT * FROM friend_status WHERE userb_id = $1 AND status = $2 OR usera_id = $1 AND status = $2", [id, true])
            //console.log(getFr.rows)
            let getFrName
            if(getFr.rows.length !== 0){
                //console.log(1)
                let arr = getFr.rows 
                for(let i = 0; i < arr.length; i++) {
                    //console.log(arr[i])
                    if (arr[i].userb_id == id){
                        //console.log(arr[i].usera_id)
                        getFrName = await pool.query("SELECT username, profile_pic_id, user_id FROM users WHERE user_id = $1", [arr[i].usera_id])
                        //console.log(getFrName.rows[0])  
                        friendListArr.push(getFrName.rows[0])
                    }else if (arr[i].usera_id == id){
                        //console.log(arr[i].userb_id)
                        getFrName = await pool.query("SELECT username, profile_pic_id, user_id FROM users WHERE user_id = $1", [arr[i].userb_id])
                        //console.log(getFrName.rows[0])
                        friendListArr.push(getFrName.rows[0])

                    }
                    //console.log(friendListArr)
                }
                //console.log(getFrName.rows[0])
            }
            //if(usera !== id) then use uder b to find fr name else use user a
            //const getFrName = await pool.query("")
            res.json(friendListArr)
        }catch(error){
            console.error(error);
            res.status(500).json("server error"); 
        }

    }



}
module.exports = friendContoller;
