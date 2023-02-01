//import { DateTime } from "luxon";
import Context from "../../context/context"
import {useContext, useState} from "react"



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';

const Comment = (props) => {    
    const { content, id, username, date } = props;
    //console.log(username)

    const context = useContext(Context)


    return (
        
        <div >
            

      <Card variant="outlined" sx={{ maxWidth: 300 }} className="mx-auto m-2 "  >

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

      </Card>

          
        </div>
      
    )
}

export default Comment; 