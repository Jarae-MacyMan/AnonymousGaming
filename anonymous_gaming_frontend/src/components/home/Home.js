import {useEffect} from "react";
import { useContext, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Context from "../../context/context";
//import UserInfo from "../UserInfo";
import HomePost from "../posts/HomePosts"
import Card from '@mui/material/Card';
import Navbar from "../navbar/Navbar";


const Home = (props) => {
  
  const context = useContext(Context);


  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/home", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
        }
      });

      const parseRes = await response.json();
      console.log(parseRes)
      context.setUserInfo(parseRes.userInfo.userData);
      context.setUserPosts(parseRes.userInfo.userPosts);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(context.userInfo)
  
  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/home/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
      const parseRes = await response.json();
      context.setAllPosts(parseRes);
      
      console.log(localStorage.token)
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(context.allPosts)

  const userPosts = context.allPosts.map((element) => {
    return <HomePost id={element.posts_id} key={element.id} content={element.content} username = {element.username}  />;
  });

  useEffect(() => {
    getAllPosts();
  }, []);



  const createPost = async (e) => {
    e.preventDefault();
    try {
      const body = { post: context.post };
      const response = await fetch("http://localhost:3001/home/post", {
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
      console.log(parseRes)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments();
    console.log(context.comments)
  },[])

  return (
    <div>
       <Navbar isAuthenticated = {props.isAuthenticated} setIsAuthenticated = {props.setIsAuthenticated} /> 

      <div className="position-absolute start-0" >
        <Link to="/dashboard"> Dashboard </Link>
      </div>


      <div>{userPosts}</div>
      <div>  
        <input onChange={(e) => onChange(e)} value={context.post}/>
        <button onClick={createPost} >Post</button>
      </div>
      
    </div>
  )
};

export default Home;