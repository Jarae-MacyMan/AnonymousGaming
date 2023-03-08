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


// let socket
// const ENDPOINT = 'http://localhost:3003'

const Chat = (props) => {
    const context = useContext(Context);
    let userId = context.userInfo.user_id


    //const [messages, setMessages] = useState([])
    //const [message, setMessage] = useState('')
    //socket.on('me')
    
    // const connectionOptions =  {
    //     "forceNew" : true,
    //     "reconnectionAttempts": "Infinity", 
    //     "timeout" : 10000,                  
    //     "transports" : ["websocket"]
    // }
    // var socket = io(ENDPOINT, {
    //     query: {
    //         //Authorization: `Bearer: ${localStorage.token}`,
    //         token: localStorage.token
    //     }
    // });

    //socket = io.connect(ENDPOINT, connectionOptions)

    //socket.
    

    return(
        <div>
            
            <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 

        </div>
    )
}

export default Chat;