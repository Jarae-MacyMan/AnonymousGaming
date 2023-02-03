//import { DateTime } from "luxon";
import Context from "../../context/context";
import { useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments.js";
import { Link } from "react-router-dom";


import * as React from 'react';

import AddCommentIcon from '@mui/icons-material/AddComment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';



const HomePost = (props) => {
  const { content, id, username, date } = props;
  //console.log(id)
  const context = useContext(Context);
  const [displayComments, setDisplayComments] = useState(false);

  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
    //console.log(input);
  };

  const [isInputRevealed, setIsInputReveleaded] = useState(false);

  const revealInput = (e) => {
    e.preventDefault(e);
    if (!isInputRevealed) {
      setIsInputReveleaded(true);
    } else setIsInputReveleaded(false);
  };
 

  const postComment = async (e) => {
    // e.preventDefault();

    const body = { comment: input };
    try {
      const response = await fetch(
        `http://localhost:3001/home/post/${id}`,
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
      context.setComments(parseRes);
      //console.log(context.comments)
    } catch (error) {
      console.error(error);
    }
  };
  
  const comments = context.comments.filter((element) => {
    //console.log(element.posts_id)
    return element.posts_id === id;
  });

  // console.log(answers);
  const postComments = comments.map((element) => {
    return (
      <Comments
        key={element.id}
        content={element.content}
        id={element.id}
        username={element.username}
        // date={element.created_at}
      />
    );
  });

  const revealComment = (e) => {
    console.log("hit");
    e.preventDefault(e);
    if (!displayComments) {
      setDisplayComments(true);
    } else {
      setDisplayComments(false);
    }
  };

  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // const userPage = () => {
  //   console.log(username)
  //     <Link to="/otheruserpage" style={{ textDecoration: 'none' }} props={username}> </Link>
  // }

  

  return (
    <div>
          <Card variant="outlined" sx={{ maxWidth: 400 }} className="mx-auto pb-2 mb-2 mt-2" >

      <div>
        

      <Grid container spacing={2} className="p-4">

      <Grid  xs={1}>
        <AccountCircleIcon/>
      </Grid>

      <Grid  xs={3}  >
          {/* <Box  className="pe-9 ps-2 text-start" >{username}</Box> */}
          <Link to={`/${username}`} style={{ textDecoration: 'none' }} class="text-reset" > {username}</Link>

      </Grid>
      <Grid xs={8}>
          <Box className="ms-9 text-end"> (time) </Box>
      </Grid>

      <Grid xs={9}>
        <Box className="ps-4 ms-5" >{content}</Box>
      </Grid>


      </Grid>
 
            <div >
                <button onClick={(e) => revealComment(e)}>see comments</button>
                <AddCommentIcon  
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className="comment-delete-logo" onClick={(e) => revealInput(e)}/>
                {/* <img className = "comment-delete-logo"src = "https://i.imgur.com/VCh6kEv.png"/> */}
          </div>

        {isInputRevealed && (
            <div className = "d-flex align-items-en pt-2 mx-2">
              <TextField sx={{ width:700, bgcolor:'#ffffff'}} onChange={(e) => onChange(e)} value={input} id="filled-basic" label="comment" variant="outlined" size="small" />

              <Button  onClick={postComment} variant="contained" sx={{ml:2, pl:3, pr:3}}>comment</Button>          
            </div>
          )}
      </div>
      </Card>
      {displayComments && <div className="comment">{postComments}</div>}

       
    </div>
  );
};

export default HomePost;
