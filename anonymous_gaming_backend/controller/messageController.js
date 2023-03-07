const pool = require('../dbconfig')

class MessageChat {
    static async addMessage (req, res) {
        const {chatId, senderId, text} = req.body
        try {

            const message =  await pool.query(
                "INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *", 
                [chatId, senderId, text])

            res.json(message.rows[0]);

        } catch (error) {
            console.error(error)
            res.status(500).json("server error")
        }
    }


    static async getMessages (req, res) {
        const {chatId} = req.params

        try {
            const allMessages = await pool.query("SELECT * FROM messages WHERE chat_id = $1", [chatId])

            res.json(allMessages.rows);


        } catch (error) {
            console.error(error)
            res.status(500).json("server error")
        }

    }



}

module.exports = MessageChat