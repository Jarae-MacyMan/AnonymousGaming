const usersModel = require("../models/usersModel");

class usersContoller {
    static async getUsers(req, res) {
      const users = await usersModel.getUsersFromDB();
      res.status(200).send(users);
    }
  
    static async getSingleUser(req, res) {
      const user_id = req.params.id;
      const user = await usersModel.getSingleUserFromDB(user_id);
      res.status(200).send(user);
    }
  
    static async updateUser(req, res) {
        const user_id = req.params.id;
        const { username, profile_pic, title} = req.body;
        const updatedUser = await usersModel.updateUserFromDB(username, profile_pic, title, user_id);
        return res.status(201).send(updatedUser.rows[0]);
    }

    static async createUser(req, res) {
      const { username, email, password } = req.body;
      if (!username || !password || !email) {
        return res.status(404).send("Insufficient information");
      }
      const newUser = await usersModel.createUserFromDB(username, email, password);
      return res.status(201).send(newUser);
    }
    
    // static async deleteUser(req, res) {
    //   const id = req.params.id;
    //   const deletedUser = await usersModel.deleteUserFromDB(id);
    //   if (deletedUser.length === 0) {
    //     return res.status(404).send("User not found");
    //   } else {
    //     return res.status(200).send(deletedUser[0]);
    //   }
    // }
  }
  
  module.exports = usersContoller;
  