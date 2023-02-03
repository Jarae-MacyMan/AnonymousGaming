import { useContext } from "react";
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


const Userstats = (props) => {
  const context = useContext(Context);
  let { username, title, games_won, games_lost  } = props.userInfo;

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    if (!context.isEditing) {
      context.setIsEditing(true);
    } else {
      context.setIsEditing(false);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { username, title} = context.inputs;

      const body = { username, title};
      const response = await fetch("http://localhost:3001/dashboard/edit", {
        method: "PUT",
        headers: {
          Authorization: `Bearer: ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      context.setUserInfo(parseRes)
      context.setIsEditing(false)
    } catch (error) {
      console.error(error.message);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // <div className = "user-info">
    //     <h2>{username}</h2>
    //     <h2>{first_name}</h2>
    //     <h2>{last_name}</h2>
    //     <h2>{bio}</h2>
    // </div>
    <Card className="mx-auto"  position="fixed" sx={{maxWidth: 345, pt:5, pb:6}}>
      
        <div className=" d-flex flex-column align-items-center text-center">
           < AccountCircleIcon sx={{ fontSize: 150 }} />
          <div className="mt-3">
            <h4>{username}</h4>
            <h6>{title}</h6>
            <Divider />
            <p>Games Won {games_won}</p>
            <p>Games Lost {games_lost}</p>

            {/* <p className="text-secondary mb-1">{`${
              first_name ? first_name : ""
            } ${last_name ? last_name : ""}`}</p>
            <p className="text-muted font-size-sm">{bio ? bio : ""}</p> */}

            <Button 
            onClick={handleOpen}
              type="button"
              variant="contained"
              className="btn btn-dark btn-sm">Edit Profile</Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <form onSubmit={onSubmitForm}>
              <TextField id="standard-basic" label="username" variant="standard"
                 sx={{ width: '35ch' }}

                onChange={(e) => onChange(e)}
                  value={context.username}
                  type="text"
                  name="username"
                  placeholder="UserName"
              />

                <TextField id="standard-basic" label="title" variant="standard"
                sx={{ width: '35ch' }}
                 onChange={(e) => onChange(e)}
                  value={context.title}
                  type="text"
                  name="title"
                  placeholder="title"
                 />
               

                
                  
                <button className="button">Submit</button>
              </form>
              </Box>
            </Modal>



           
          </div>
        </div>
      
    </Card>
  );
};

export default Userstats;
