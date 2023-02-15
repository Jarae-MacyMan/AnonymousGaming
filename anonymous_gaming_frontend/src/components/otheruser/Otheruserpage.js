import {useEffect} from "react";

import { useContext, useState } from "react";
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


import * as React from 'react';

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
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';



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
        //    console.log(context.pending)

    // console.log(context.userInfo.user_id)
    // console.log(context.otherUserInfo.user_id)

    //if status is false then loading is true 
    const checkFriend = async () => {
        let userId = context.userInfo.user_id
        let otherUserId = context.otherUserInfo.user_id
       

        try{
           

            const response = await fetch(`http://localhost:3001/friend/friendCheck/${userId}/${otherUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer: ${localStorage.token}`,
                    "Content-Type": "application/json",
                },
            });
            const parseRes = await response.json();
            console.log(parseRes.status)
            if(parseRes && parseRes.status == false){
                console.log(parseRes.status)
                context.setLoading(true)
                context.setPending("Pending")
                //console.log(parseRes.status)
            } else if (parseRes.status == true) {
                console.log(parseRes)
                context.setPending("Already Friends")
                context.setLoading(true)
            }
            

        }catch(error){
            console.error(error.message);
            context.setLoading(false)
            context.setPending("send")

        }
    }
    //useEffect(() => {
        checkFriend()
      //}, []);
    



        

    const handleClick = async () => {
        context.setLoading(true);
        context.setPending("Pending")
            
        let userID = context.userInfo.user_id
        let otherUserID = context.otherUserInfo.user_id
        const body = {userID, otherUserID }

        //console.log(body)
        try{
            const body = {userID, otherUserID }

            const response = await fetch("http://localhost:3001/friend/send", {
                method: "POST",
                headers: {
                    Authorization: `Bearer: ${localStorage.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const parseRes = await response.json();
            //console.log(parseRes)
        }catch(error){
                console.error(error.message);
        }
    }

        //console.log(parseRes)
    return (
        
        <div> 
            <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 





            <Grid container columns={2} >
                <Grid sx={{ mt:2, ml:40, width: 500}}>
                    <OtherUserPostDisplay />
                </Grid>

                <Grid sx={{ mt:6, ml:2, width: 600}}>    
                    <Otheruserstats  otherUserInfo={context.otherUserInfo} />

                    {/* <Button variant="contained">Add Friend</Button> */}

                    <LoadingButton
                    onClick={handleClick}
                    endIcon={<SendIcon />}
                    loading={context.loading}
                    loadingPosition="end"
                    variant="contained"
                    >
                    <span>{context.pending}</span>
                    </LoadingButton>

                </Grid>
            </Grid>




           {/* <div> {context.otherUserPosts} </div> */}
           
        </div>
    )
}

export default Otheruserpage;