import { io } from "socket.io-client";

import Context from "../../context/context";
import { useContext, useState, useEffect} from "react";
import * as React from 'react';
import { Link } from "react-router-dom";
import NavChat from "./NavChat.js";
import Navbar from "../navbar/Navbar";



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';

const specificChat = (props) => {
    const context = useContext(Context);

    return(
        <div>
            

        </div>
    )
}

export default specificChat;