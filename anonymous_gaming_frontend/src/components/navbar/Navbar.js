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
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';


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

        //if they have friends put them in context 
          if(parseRes.userInfo.receiveFriend){
            let arr = parseRes.userInfo.stats
            arr.pop()
            context.setRequests(arr)
            context.setHasRequest(true)
          }
        
        
      } catch (error) {
        console.error(error);
      }
    }
          
    

    useEffect(() => {
      receiveFriendReq()
    }, []);

    

      //console.log(context.hasRequest)
    
    const handleClick = async (id, username) => {
      //console.log(id)

      try {

        const body = {id}
        //console.log(body)
        const response = await fetch("http://localhost:3001/friend/accept", {
          method: "PUT",
          headers: {
            Authorization: `Bearer: ${localStorage.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }); //when u ckick accept adds friend to friemd list
        const parseRes = await response.json();
        //console.log(parseRes.usera_id)
        context.setfriendList([...context.friendList, {username:username, id:parseRes.usera_id, status: true}])
      } catch (error) {
        console.error(error.message);
      }
    }

    //console.log(context.friendList)
    const friendReqBar = context.requests.map((e) =>{
      if(context.hasRequest == true && e.status == false){
        return <div className = "pt-2" >{e.username} <Button onClick={() => handleClick(e.user_id, e.username)} sx={{ m:2}} variant="contained" size="small">accept</Button> </div>
      }
    })

    const getFriends = async () => {
      try {
        const response = await fetch("http://localhost:3001/friend/allFriends", {
          method: "GET",
          headers: {
            Authorization: `Bearer: ${localStorage.token}`,
          },
        });
  
        const parseRes = await response.json();
        console.log(parseRes)
        context.setfriendList(parseRes)
        // context.setUserInfo(parseRes.userInfo.userData);
        // context.setUserPosts(parseRes.userInfo.userPosts);
      } catch (error) {
        console.error(error);
      }
    };



    useEffect(() => {
      getFriends()
    }, []);

    const getChats = async () => {
      //let userId = context.userInfo.user_id


      try {
          const response = await fetch(`http://localhost:3001/chat/allChats`, {
            method: "GET",
            headers: {
                Authorization: `Bearer: ${localStorage.token}`,
                "Content-Type": "application/json",
              },
            
          });
          
          const parseRes = await response.json();
          //console.log(parseRes)
          //context.setChats(parseRes);
          const chattingWith = parseRes.chattingWith
          const chatRoom = parseRes.chatRoom
          
          let arr = []
          chattingWith.forEach((num1, index) => {
            const num2 = chatRoom[index];
            //console.log(num1, num2);
            const obj = {
              username: num1.username,
              userId: num1.user_id,
              userPfp: num1.profile_pic_id,
              chatId: num2.chat_id,
              members: num2.members
            }

            arr.push(obj)

          });

          context.setChats(arr)


          
        } catch (error) {
          console.error(error);
        }
         

        
  }

  //console.log(context.chats)
  // console.log(context.chats.chatRoom)
  
// onClick={() => handleClick(e.chatId)} 
  useEffect(() => {
      getChats();
  }, []);

  const chatBar = context.chats.map((e) =>{
    return <> <div className = "py-2" onClick={() => context.setCurrChat(e)}  > {e.username} </div> <Divider />  </>
  })

  //e.user_id, e.username



    const chatOrElse = function() { 
      if (pathname == "/chat"){
        return (<div> 
          <Divider />
          {chatBar} 
          </div>)
      } else {
        return (
          <div> 
              
              <Divider />

              <div>Add Friends</div>

              <TabContext  value={context.value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} orientation="vertical" aria-label="lab API tabs example">
                    {friendListBar}
                  </TabList>
                </Box>
              </TabContext>

              <Divider />

              <div>Friend Requests</div>
                {friendReqBar} 
          
          </div>
        )
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MarkChatUnreadIcon/>
              </ListItemIcon> 
              <Link to="/chat" style={{ textDecoration: 'none' }} > Private Messages </Link>
            </ListItemButton>
          </ListItem>
        </List>


         


            {chatOrElse ()}
            
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