const pool = require('../dbconfig')

class classChat {
    static async createChatRoom (req, res) {
        try {
        //   //const posts_id = req.params.id
        //   const {id} = req.params;
        //   const {name} = req.body;
         //const id = req.user
         
            const member = req.body.senderId
            const otherMember = req.body.receiverId

            //console.log(member)
            //console.log(otherMember)
            

            //const members = [req.body.senderId, req.body.receiverId]

            const chatroom = await pool.query(
                "INSERT INTO chats (members) VALUES (ARRAY [$1, $2]) RETURNING *",
                [member, otherMember]);
        
            res.json(chatroom.rows[0]);


        } catch (error) {
          console.error(error)
          res.status(500).json("server error")
        }
    }

    static async allUserChats (req, res) {
        //const id = req.user
        try {
       
            const member = req.params.userId

            console.log(member)

            const chatrooms = await pool.query(
                "SELECT * FROM chats WHERE  $1 = any (members)",
                [member]);
            
            console.log(chatrooms.rows) 

            res.json(chatrooms.rows);


        } catch (error) {
          console.error(error)
          res.status(500).json("server error")
        }
    }

    static async findChat (req, res) {
        //const id = req.user
        try {
       
            const member = req.params.firstId
            const otherMember = req.params.secondId

            console.log(otherMember)

            const chatroom = await pool.query(
                "SELECT * FROM chats WHERE $1 = any (members) AND $2 = any (members)",
                [member, otherMember],);

            res.json(chatroom.rows[0]);


        } catch (error) {
          console.error(error)
          res.status(500).json("server error")
        }
    }
}

module.exports = classChat