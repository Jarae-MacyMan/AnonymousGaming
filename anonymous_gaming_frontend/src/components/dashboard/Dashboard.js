import Context from "../../context/context";
import { Link } from "react-router-dom";
// import UserInfo from "../UserInfo";
import UserPostDisplay from "../posts/UserPostDisplay";
import Navbar from "../navbar/Navbar";
import Chat from "../chat/Chat";


// import dashboard from "./dashboard.css";
import Userstats from "../userstats/UserStats";


import {useEffect} from "react";
//import Context from "../context/context";

import { useContext, useState } from "react";
import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
//import {Grid, GridItem, Tabs} from "@chakra-ui/react"






const Dashboard = (props) => {
  const context = useContext(Context);

  const getUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes)
      context.setUserInfo(parseRes.userInfo.userData);
      context.setUserPosts(parseRes.userInfo.userPosts);
    } catch (error) {
      console.error(error);
    }
  };
  
  //console.log(context.userPosts)
    //console.log(context.value)


  // const handleChange = (event, newValue) => {
  //   context.setValue(newValue);
  // };


  const createPost = async (e) => {
    e.preventDefault();
    try {
      const body = { post: context.post};
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "POST",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      context.setNewPost(parseRes)
      console.log(parseRes)
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(
    () => {
      getUserInfo();
    },
    [context.newPost],
    [context.userInfo]
  );

  const onChange = (e) => {
    context.setPost(e.target.value);
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/home/post/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer: ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const parseRes = await response.json();
      context.setComments(parseRes);
      //console.log(parseRes)
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(context.comments)
  
  useEffect(() => {
    getComments();
    //console.log(context.comments)
  },[])


  
  const setAuth = (boolean) => {
    props.setIsAuthenticated(boolean);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div>
            <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 

    <div >
          <input  label="Type here"  onChange={(e) => onChange(e)} value={context.post} />
          <button  onClick={createPost} variant="contained">POST</button>
        </div>
        
    <Grid container columns={2} >
      <Grid sx={{ mt:2, ml:40, width: 500}}>
        <UserPostDisplay/>
      </Grid>

      <Grid sx={{ mt:6, ml:2, width: 600}}>    
      <Userstats  userInfo={context.userInfo} />
      </Grid>
    </Grid>




    

      <Chat/>

      <Box>
          {context.value}
      </Box>

        

      </div>  
  );
};

export default Dashboard;
