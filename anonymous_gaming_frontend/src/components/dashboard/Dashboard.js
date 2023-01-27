import Context from "../../context/context";
import { Link } from "react-router-dom";
// import UserInfo from "../UserInfo";
import UserPostDisplay from "../posts/UserPostDisplay";
// import Navbar from "../Navbar";
// import dashboard from "./dashboard.css";
// import Footer from "../Footer"

import {useEffect} from "react";
//import Context from "../context/context";

import { useContext, useState } from "react";
import React from "react";







const Dashboard = (props) => {
  const context = useContext(Context);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
        },
      });

      const parseRes = await response.json();
      //console.log(parseRes)
      context.setUserInfo(parseRes.userInfo.userData);
      context.setUserPosts(parseRes.userInfo.userPosts);
    } catch (error) {
      console.error(error);
    }
  };
  
  //console.log(context.userInfo)


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

    <div className="position-absolute start-0" >
      <Link to="/home"> Home</Link>
    </div>



        <div> {context.userInfo.username} </div>    
        <div >
          <input  label="Type here"  onChange={(e) => onChange(e)} value={context.post} />
          <button  onClick={createPost} variant="contained">POST</button>
        </div>

        <UserPostDisplay/>
      </div>  
  );
};

export default Dashboard;
