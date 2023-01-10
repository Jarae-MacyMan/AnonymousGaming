import React from "react";
import { useContext } from "react";
import Context from "../../context/context";
import UserPostFormat from "./UserPostFormat.js";
//import Comments from "../comments/Comments";
//import userInfo from "./userInfo.css";

const UserPostDisplay = (props) => {
  const context = useContext(Context);
  const userPosts = context.userPosts.map((element) => {
        return (
            <UserPostFormat
                key = {element.posts_id}
                id = {element.posts_id}
                content = {element.content}
                username = {element.username}
                //date = {element.created_at}
            />
        );
    });

    //console.log(id)

    return (
        <div> 
            {userPosts} 
        </div>
    )
};

export default UserPostDisplay;
