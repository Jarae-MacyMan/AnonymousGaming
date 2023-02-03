import {useEffect} from "react";

import { useContext, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Context from "../../context/context";
//import UserInfo from "../UserInfo";
import HomePost from "../posts/HomePosts"
import Card from '@mui/material/Card';
import Navbar from "../navbar/Navbar";
import Userstats from "../userstats/UserStats";
import Otheruserstats from "../userstats/OtherUserStats";
import OtherUserPostDisplay from "../posts/OtherUserPostDisplay";
//import OtherUserPostsFormat from "../posts/OtherUserPostsFormat.js";



import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';


const drawerWidth = 240;


const Otheruserpage = (props) => {
    const context = useContext(Context);
    //const {username} = props 
    //const {name} = useParams()

   
    const pathname = window.location.pathname 
    //console.log(pathname)

    const getUserInfo = async () => {
        //e.preventDefault();
        try {
          const response = await fetch(`http://localhost:3001/users${pathname}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer: ${localStorage.token}`,
                "Content-Type": "application/json",
              },
            
          });
    
          const parseRes = await response.json();
          //console.log(parseRes)
          context.setOtherUserInfo(parseRes.userInfo.userData);
          context.setOtherUserPosts(parseRes.userInfo.userPosts);
        } catch (error) {
          console.error(error);
        }
      };

       

        useEffect(
            () => {
              getUserInfo();
            },
            [context.otherUserPosts],
            [context.otherUserInfo]
          );
        //    console.log(context.otherUserPosts)
        //    console.log(context.otherUserInfo)



    return (
        
        <div> 
            <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 





            <Grid container columns={2} >
                <Grid sx={{ mt:2, ml:40, width: 500}}>
                    <OtherUserPostDisplay />
                </Grid>

                <Grid sx={{ mt:6, ml:2, width: 600}}>    
                    <Otheruserstats  otherUserInfo={context.otherUserInfo} />
                </Grid>
            </Grid>




           {/* <div> {context.otherUserPosts} </div> */}
           
        </div>
    )
}

export default Otheruserpage;