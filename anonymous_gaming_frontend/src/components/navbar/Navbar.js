import './Navbar.css';
import Context from "../../context/context";
import { useContext, useState, useEffect } from "react";
import queryString from 'query-string'
import { useLocation, Link} from "react-router-dom"





import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import PropTypes from 'prop-types';
import CircleIcon from '@mui/icons-material/Circle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';



const drawerWidth = 240;

// const {roomCode} = queryString.parse(search)
// console.log(roomCode)



const Navbar = (props) => {
    const context = useContext(Context);
    // const {search} = useLocation()
    // const {roomCode} = queryString.parse(search)

    const pathname = window.location.pathname 

    //console.log(pathname)

    //const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      context.setValue(newValue);
    };


    const getUserInfo = async () => {
        try {
          const response = await fetch("http://localhost:3001/dashboard", {
            method: "GET",
            headers: {
              Authorization: `Bearer: ${localStorage.token}`,
            },
          });
    
          const parseRes = await response.json();
          //console.log(parseRes)
          context.setUserInfo(parseRes.userInfo.userData);
          context.setUserPosts(parseRes.userInfo.userPosts);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(
        () => {
          getUserInfo();
        },
        [context.userInfo]
      );

    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        props.setIsAuthenticated(boolean);
      };

    const friendListBar = context.friendList.map((e) =>{
        return <Tab icon={<CircleIcon  fontSize="small"/>} iconPosition="start" label= {e.username} value= {e.username} />

    })

    //console.log(context.friendList)
    //e.connected ? color:green : color:red
    // const logout = (e) => {
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     setAuth(false);
    //   };

    const receiveFriendReq = async () => {
      try {
        const receiveFriend = await fetch("http://localhost:3001/friend/received", {
          method: "GET",
          headers: {
            Authorization: `Bearer: ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        });
        const parseRes = await receiveFriend.json();

        
          if(parseRes.userInfo.receiveFriend){
            console.log(parseRes.userInfo.receiveFriend)
            context.setHasRequest(true)
          }// } else {

          // }
        
        
        // context.setUserInfo(parseRes.userInfo.userData);
        // context.setUserPosts(parseRes.userInfo.userPosts);
      } catch (error) {
        console.error(error);
      }
    }

    receiveFriendReq()

      //console.log(context.hasRequest)
    
    const accept = () => {
      if(context.hasRequest == true){
        return <Button variant="contained">accept</Button>
      }

    }



    return (
        
        <Box sx={{ display: 'flex' }}>
            
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              AnonymousGaming
            </Typography>
          </Toolbar>
          
        </AppBar>

        

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          
          variant="permanent"
          anchor="left"
          
        >
        <div class="py-3">
        <Typography  >
             
           Welcome {context.userInfo.username}
            </Typography>
        </div>
       

       
        {/* <Toolbar>
        <Toolbar /> */}

          <Divider />
          <List>
            
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <Link to="/dashboard"  style={{ textDecoration: 'none' }}> Dashboard </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <Link to="/home" style={{ textDecoration: 'none' }} > Home</Link>
            </ListItemButton>
          </ListItem>
        </List>
          <Divider />

            Private Messages

          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          Add Friends

          <TabContext  value={context.value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} orientation="vertical" aria-label="lab API tabs example">
            {friendListBar}
          </TabList>

        </Box>
       
          </TabContext>

          <Divider />

          Friend Requests

            {accept()}


        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          
        </Box>
      </Box>
    )
}

export default Navbar;