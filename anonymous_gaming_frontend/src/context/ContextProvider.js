import { useState } from "react";
import Context from "./context";

const ContextProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    title: "",
    profile_pic: ""
  });

  const [userInfo, setUserInfo] = useState({});

  const [userPosts, setUserPosts] = useState([]);

  const [allPosts, setAllPosts] = useState([]);

  const [comments, setComments] = useState([]);

  const [post, setPost] = useState(""); //constrolled state

  const [newPost, setNewPost] = useState("")

  const [comment, setComment] = useState("");

  const [isEditing, setIsEditing] = useState(false)

  const [profile_pic, setProfile_pic] = useState("")

  const state = {
    inputs,
    setInputs,
    userInfo,
    setUserInfo,
    userPosts,
    setUserPosts,
    post,
    setPost,
    newPost,
    setNewPost,
    allPosts, 
    setAllPosts,
    isEditing,
    setIsEditing,
    comments,
    setComments,
    comment,
    setComment,
    profile_pic,
    setProfile_pic
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default ContextProvider;
