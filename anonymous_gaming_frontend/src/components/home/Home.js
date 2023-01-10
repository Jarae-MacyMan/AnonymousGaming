import {useEffect} from "react";
import { useContext, useState } from "react";
import React from "react";
//import { Link } from "react-router-dom";
import Context from "../../context/context";
//import UserInfo from "../UserInfo";


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
    return <div> content={element.content} username = {element.username} </div>;
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

  // const setAuth = (boolean) => {
  //   props.setIsAuthenticated(boolean);
  // }

  return (
    <div>
      <div> {context.userInfo.username} </div>
      <div>{userPosts}</div>
      <div>  
        <input onChange={(e) => onChange(e)} value={context.post}/>
        <button onClick={createPost} >Post</button>
      </div>
      
    </div>
  )
};

export default Home;