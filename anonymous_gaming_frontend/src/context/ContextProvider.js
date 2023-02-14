import { useState } from "react";
import Context from "./context";
import * as React from 'react';

let arr = []

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

  //const [otherUserPosts, setUserPosts] = useState([]);

  const [comments, setComments] = useState([]);

  const [post, setPost] = useState(""); //constrolled state

  const [newPost, setNewPost] = useState("")

  const [comment, setComment] = useState("");

  const [isEditing, setIsEditing] = useState(false)

  const [profile_pic, setProfile_pic] = useState("")

  const [otherUserInfo, setOtherUserInfo] = useState("")

  const [otherUserPosts, setOtherUserPosts] = useState([])

  const [friendList, setfriendList] = useState([])

  const [value, setValue] = React.useState("");

  const [isFriend, setIsFriend] = useState(false)

  const [pending, setPending] = useState("Send")

  const [loading, setLoading] = React.useState(false);

  const [hasRequest, setHasRequest] = useState(false)

  const [requests, setRequests] = useState([])

  const [friend, setFriend] = useState([])



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
    setProfile_pic,
    otherUserInfo,
    setOtherUserInfo,
    otherUserPosts,
    setOtherUserPosts,
    value,
    setValue,
    friendList,
    setfriendList,
    isFriend,
    setIsFriend,
    pending,
    setPending,
    loading,
    setLoading,
    hasRequest,
    setHasRequest,
    requests,
    setRequests,
    friend,
    setFriend

  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default ContextProvider;
