//import { DateTime } from "luxon";
import Context from "../../context/context";
import { useContext, useState } from "react";
import Comments from "../comments/Comments.js";
import * as React from 'react';


const UserPostFormat = (props) => {
  const { content, id, username, date} = props;
  const context = useContext(Context);
  const [displayComments, setDisplayComments] = useState(false);

  const onChange = (e) => {
    context.setAnswer(e.target.value);
  };

  const deletePost = async (e) => {
    //console.log(id)
    //console.log(e)
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/dashboard/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer: ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const parseRes = await response.json();
      context.setNewPost(parseRes);
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async (e) => {
    console.log("hit", id);
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/dashboard/posts/${id}`,
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
      console.log(context.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    const body = { comment: context.comment };
    try {
      const response = await fetch(
        `http://localhost:3001/dashboard/posts/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer: ${localStorage.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      // context.setAnswers(parseRes)
      // console.log(context.answers)
    } catch (error) {
      console.error(error);
    }
  };

  //dropdown
  const revealComment = (e) => {
    console.log("hit");
    e.preventDefault(e);
    if (!displayComments) {
      setDisplayComments(true);
    } else {
      setDisplayComments(false);
    }
  };
  console.log(context.comments)

  const comments = context.comments.filter((element) => {
    return element.posts_id === id;
  });


  const postComments = comments.map((element) => {
    return (
      <Comments key={element.id} content={element.content} id={element.id} username = {element.username} />
    );
  });

 


  

  return (
    <div>
    

        <div>
            <span>{username}</span>
            {/* <span>{DateTime.fromISO(date).toRelative()}</span> */}
        </div>
        {/* className="postText" */}
             <span>{content}</span>

        <div >
          <button onClick={(e) => deletePost(e)} > delete</button>
        </div>

        <div>{postComments}</div>
  
        {/* {displayComments && <div>{postComments}</div>} */}
    </div>
  );
};

export default UserPostFormat;
