//import { DateTime } from "luxon";
import Context from "../../context/context";
import { useContext, useState } from "react";
//import Comments from "../comments/Comments.js";
import * as React from 'react';
import { Link } from "react-router-dom";



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';





const OtherUserPostsFormat = (props) => {
  const { content, id, username, date} = props;
  //const context = useContext(Context);
  //const [displayComments, setDisplayComments] = useState(false);

  // const onChange = (e) => {
  //   context.setAnswer(e.target.value);
  // };

  //const getComments = async (e) => {
  //   console.log("hit", id);
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/dashboard/posts/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer: ${localStorage.token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const parseRes = await response.json();
  //     context.setComments(parseRes);
  //     //console.log(context.comments);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const postComment = async (e) => {
  //   e.preventDefault();

  //   const body = { comment: context.comment };
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/dashboard/posts/${id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer: ${localStorage.token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(body),
  //       }
  //     );
  //     const parseRes = await response.json();
  //     // context.setAnswers(parseRes)
  //     // console.log(context.answers)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //dropdown
  // const revealComment = (e) => {
  //   console.log("hit");
  //   e.preventDefault(e);
  //   if (!displayComments) {
  //     setDisplayComments(true);
  //   } else {
  //     setDisplayComments(false);
  //   }
  // };
  //console.log(context.comments)

  // const comments = context.comments.filter((element) => {
  //   return element.posts_id === id;
  // });


  // const postComments = comments.map((element) => {
  //   return (
  //     <Comments key={element.id} content={element.content} id={element.id} username = {element.username} />
  //   );
  // });

 


  

  return (
    <div className="m-5">
    
    <Card variant="outlined" sx={{ maxWidth: 400 }} className="mx-auto pb-2 "  >

    <Grid container spacing={2} className="p-4">

        <Grid  xs={1}>
          <AccountCircleIcon/>
        </Grid>

        <Grid  xs={3}  >
            <Box  className="pe-9 ps-2 text-start">{username}</Box>
        </Grid>

        <Grid xs={8}>
            <Box className="ms-9 text-end"> (time) </Box>
        </Grid>

        <Grid xs={9}>
          <Box className="ps-4 ms-5" >{content}</Box>
        </Grid>


    </Grid>

        {/* className="postText" */}
       

        

  
        {/* {displayComments && <div>{postComments}</div>} */}
        </Card>
        {/* <div>{postComments}</div> */}
    </div>
    
  );
};

export default OtherUserPostsFormat;
