import { DateTime } from "luxon";
import Context from "../../context/context";
import { useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments.js";

import * as React from 'react';



const Post = (props) => {
  const { content, id, username, date } = props;
  const context = useContext(Context);
  const [displayComments, setDisplayComments] = useState(false);

  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
    console.log(input);
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
      // console.log(context.answers)
    } catch (error) {
      console.error(error);
    }
  };

  const comments = context.comments.filter((element) => {
    return element.posts_id === id;
  });

  // console.log(answers);
  const postComments = comments.map((element) => {
    return (
      <Answer
        key={element.comments_id}
        content={element.content}
        id={element.comments_id}
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

  

  return (
    <div>
    
      <div className="container-fluid">
       <Card sx={{mb:4, width: 900, ml:30, mt:5}}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            /> */}
                 <AccountCircleIcon/>
                <span className="postUsername"> {username}</span>
                <span className="postDate">
                  {DateTime.fromISO(date).toRelative()}
                </span>
              </div>
              <div className="postTopRight">{/* <MoreVert /> */}</div>
            </div>
            

             <Box sx={{ml:2, mt:3, mb:3}}>
         
          <Typography className="postCenter" >
            <span className="postText">{content}</span>
          </Typography>
        

          
          {/* <img className="postImg" src={post.photo} alt="" /> */}
        </Box>
            
            <div className="postBottom">
              <div className="postBottomLeft"></div>
              <div className="postBottomRight">

               

                <img
                  onClick={(e) => revealComment(e)}
                  className="comment-delete-logo"
                  src="https://i.imgur.com/Aw0VpJz.png"
                />

                <AddCommentIcon  
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className="comment-delete-logo" onClick={(e) => revealInput(e)}/>

  <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}> Add a comment</Typography>
      </Popover>
                
                {/* <img className = "comment-delete-logo"src = "https://i.imgur.com/VCh6kEv.png"/> */}
              </div>
            </div>
          </div>
        </Card>

        {isInputRevealed && (
            <div className = "d-flex align-items-end">
            <TextField sx={{ml:40, width:700, bgcolor:'#ffffff'}} onChange={(e) => onChange(e)} value={input} id="filled-basic" label="Filled" variant="filled" />

            <Button className = " answer-btn btn btn-sm user-info" onClick={postAnswer} variant="contained" sx={{ml:2, pt:2, pb:2}}>Answer</Button>          
            </div>
          )}
        {displayComments && <div className="comment">{postAnswers}</div>}
      </div>
       
    </div>
  );
};

export default Post;

// <div className="post">
//   <div className = "post-content">
//   <p>{content}</p>
//   </div>
//   <img onClick = {e => onClick(e)} className = "delete-btn" src = "https://i.imgur.com/VCh6kEv.png"></img>
//   <img src = "https://i.imgur.com/Aw0VpJz.png" className = "comment-btn" onClick = {e => getAnswers(e)}></img>
//   <form onSubmit = {postAnswer}>
//   <input onChange = {(e) => onChange(e)}type = "text" name ="answer" value = {context.answer}></input>
//   <button>Answer</button>
//   </form>
//   {/* <button onClick = {e => postAnswer(e)}>Answer</button> */}
//   <div>
//     {postAnswers}
//   </div>
// </div>
