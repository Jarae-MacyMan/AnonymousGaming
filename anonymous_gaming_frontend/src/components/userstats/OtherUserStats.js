import { useContext, useEffect } from "react";
import Context from "../../context/context";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Otheruserstats = (props) => {
  const context = useContext(Context);
  let { username, title, games_won, games_lost } = props.otherUserInfo;

  const pathname = window.location.pathname 


//   const getUserInfo = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch(`http://localhost:3001/users${pathname}`, {
//           method: "GET",
          
//         });
  
//         const parseRes = await response.json();
//         //console.log(parseRes)
//         context.setOtherUserInfo(parseRes.userInfo.userData);
//       } catch (error) {
//         console.error(error);
//       }
//   };

//   useEffect(
//     () => {
//       getUserInfo();
//     },
//     [context.otherUserInfo]
//   );

  
  return (
    
    <Card className="mx-auto"  position="fixed" sx={{maxWidth: 345, pt:5, pb:6}}>
      
        <div className=" d-flex flex-column align-items-center text-center">
           < AccountCircleIcon sx={{ fontSize: 150 }} />
          <div className="mt-3">
            <h4>{username}</h4>
            <h6>{title}</h6>
            <Divider />
            <p>Games Won {games_won}</p>
            <p>Games Lost {games_lost}</p>
           
          </div>
        </div>
      
    </Card>
  );
};

export default Otheruserstats;
