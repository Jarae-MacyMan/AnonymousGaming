//import ChatNavbar from "../navbar/Navbar";
import { io } from "socket.io-client";

import Context from "../../context/context";
import { useContext, useState, useEffect, useRef} from "react";
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
    const socket = useRef()

    //console.log(context.currChat )
    useEffect(() => {
        if(context.sendMessage !== null) {
            socket.current.emit('send-message', context.sendMessage)
        }
    }, [context.sendMessage]) 

    //depend on current user connected 
    useEffect(() => {
        socket.current = io('http://localhost:3001');
        socket.current.emit("new-user-add", userId) //calls the backend to run the new user connect func and send user id 
        socket.current.on('get-users', (users) => {
            context.setOnlineUsers(users)
            
        })//catch emitted users on client side
    }, [userId])


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
                <div className = {message.sender_id == userId ? "message own" : "message other"}>
                    <span>{message.text}</span>
                    <span></span>
                </div>
            </> 
        )
    })
    const onChange = (e) => {
        context.setNewMessage(e.target.value);
      };
    
    // const handleChange = (newMessage) => {
    //     context.setNewMessage(newMessage)
    // }

    const handleSend = async (e) => {
        e.preventDefault() //
       
        const chatId =  parseInt(chatID)
        const senderId =  parseInt(userId)
        const text = context.newMessage
        

        try{
            const body = {chatId, senderId, text}
            const response = await fetch("http://localhost:3001/message/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer: ${localStorage.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const parseRes = await response.json();

            context.setMessages([...context.messages, parseRes])
            context.setNewMessage('')

        } catch (error) {
            console.log(error)
        }

        const receiverId = context.currChat.members.find((id) => id != userId)
        context.setSendMessage ({...context.message, receiverId})
    }

    return(
        <div>
            
            <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 

      

        {chatID ? (

            <>
            {messageDisplay}

            <TextField  onChange={(e) => onChange(e)} value={context.message} id="outlined-basic" label="message..." variant="outlined" />
            <button onClick={handleSend}  variant="contained"> SEND </button>
            </>

        ) : (
            <span> tap to start convo</span>
        )}
        

        </div>
    )
}

export default Chat;