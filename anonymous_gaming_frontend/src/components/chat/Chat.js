//import ChatNavbar from "../navbar/Navbar";
import { io } from "socket.io-client";

import Context from "../../context/context";
import { useContext, useState, useEffect} from "react";
import * as React from 'react';
import { Link } from "react-router-dom";
//import NavChat from "./NavChat.js";
import Navbar from "../navbar/Navbar";



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


// let socket
// const ENDPOINT = 'http://localhost:3003'

const Chat = (props) => {
    const context = useContext(Context);
    let userId = context.userInfo.user_id
    let chatID = parseInt(context.currChat.chatId)
    //console.log(chatID )

    const getChat = async () => {

        try {
            const response = await fetch(`http://localhost:3001/message/${chatID}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer: ${localStorage.token}`,             "Content-Type": "application/json",
                "Content-Type": "application/json",

              },
            });
      
            const parseRes = await response.json();
            //console.log(parseRes)
            context.setMessages(parseRes)
            // // context.setUserInfo(parseRes.userInfo.userData);
            // // context.setUserPosts(parseRes.userInfo.userPosts);
          } catch (error) {
            console.error(error);
          }
       
    }

  //console.log(context.messages)


    if (chatID) getChat();
    
    const messageDisplay = context.messages.map((message) => {
        return (
            <>
                <div className = {message.sender_id == userId? "message own" : "message other"}>
                    <span>{message.text}</span>
                    <span></span>
                </div>
            </> 
        )
    })

    const handleChange = (newMessage) => {
        context.setNewMessage(newMessage)
    }

    return(
        <div>
            
            <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 

      

        {chatID ? (

            <>
            {messageDisplay}

            <TextField  onChange = {handleChange} id="outlined-basic" label="message..." variant="outlined" />
            <button   variant="contained"> SEND </button>
            </>

        ) : (
            <span> tap to start convo</span>
        )}
        

        </div>
    )
}

export default Chat;