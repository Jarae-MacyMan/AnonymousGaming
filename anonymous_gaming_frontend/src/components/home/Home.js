import {useEffect} from "react";
import { useContext, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Context from "../../context/context";
//import UserInfo from "../UserInfo";





const Home = (props) => {
  
  const context = useContext(Context);
  
  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/home", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
          // token: localStorage.token,
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
  console.log(context.allPosts)

  const userPosts = context.allPosts.map((element) => {
    return <div> content={element.content} username = {element.username} </div>;
  });


  useEffect(() => {
    getAllPosts();
    //console.log()
  }, []);

  

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false)

  const setAuth = (boolean) => {
    props.setIsAuthenticated(boolean);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  //  const onChange = (e) => {
  //   context.setQuestion(e.target.value);
  // };

  

  return (
    <div>
       <div>{userPosts}</div>
    </div>
  );
};

export default Home;
