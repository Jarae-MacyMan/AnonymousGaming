const pool = require('../dbconfig')

class MessageChat {
    static async addMessage (req, res) {
        const {chatId, senderId, text} = req.body
        try {


        } catch (error) {
            console.error(error)
            res.status(500).json("server error")
        }
    }


    static async getMessages (req, res) {
        const {chatId} = req.params

        try {

        } catch (error) {
        console.error(error)
        res.status(500).json("server error")
      }

    }



}

module.exports = MessageChat