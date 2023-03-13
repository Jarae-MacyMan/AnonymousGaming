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
        const id = req.user
        try {
       
           let fri

            //console.log(id)

            const chatrooms = await pool.query(
                "SELECT * FROM chats WHERE  $1 = any (members)",
                [id]);
            
            
            

            let arr = []
            let finalArr = []
            chatrooms.rows.map(e => ( 
                    arr.push(e.members)
                ));

                for (let x of arr){
                    for(let y of x){
                        if(y != id){
                            //console.log(y)
                            fri = await pool.query(
                                "SELECT username, user_id, profile_pic_id FROM users WHERE  user_id = $1 ",
                                [y])
                                finalArr.push(fri.rows[0])

                        }
                    }
                }


                //console.log(finalArr)
                // for (let i of arr){
                //     if (i != id) {
                //         fri = await pool.query(
                //             "SELECT username, user_id, profile_pic_id FROM users WHERE  user_id = $1 ",
                //             [i])
                //         console.log(fri.rows[0])
                //     }
                // }


                const chatsInfo = {
                    chatRoom: chatrooms.rows,
                    chattingWith: finalArr
                }

            res.json(chatsInfo);
            //res.json(finalArr);



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

            //console.log(otherMember)

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