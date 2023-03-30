import { React, useContext } from "react";
import Context from "../../context/context";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';






const Login = ({ setAuth }) => {
  const context = useContext(Context);
  const { email, password } = context.inputs;

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( body ),
      });
      const parseRes = await response.json();
      

      localStorage.setItem("token", parseRes.token);

      setAuth(true);
      console.log(setAuth)

    } catch (error) {
      console.error(error.message);
    }
  };

  //textAlign: 'center',

  return (
    
          
          <div >
          <AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
              AnonymousGaming
            </Typography>

            </Toolbar>

          </AppBar>
          
           
          <div class="mx-auto">
           <Card sx={{ mt:6, pt:18, mx:40, pb:57}}  >

           <Grid  >
            
            <Grid item xs={8}>
              <div >
                <label className="px-2">
                  <h3 >Email Address:</h3>
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  value={email}
                  type="email"
                  name="email"
                  className ="mb-4"
                  placeholder="Enter a valid email address"
                /> 
              </div>
            </Grid>
            
            <Grid item xs={8}>
              <form onSubmit={onSubmitForm} >
                  <label className="px-2">
                    <h3 >Password: </h3>
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    value={password}
                    className = "p"
                    name="password"
                    placeholder="Enter password"
                  />

                  <div className="mt-2">
                    <Button variant="contained" type="submit"> Login</Button>
                  </div>
                </form>
             
              </Grid>
            
          </Grid>

              

              

            <div className="mt-2">
                <small  >
                  Don't have an account?
                  <span> </span>
                  <Link to="/register" >
                    Sign up
                  </Link>
                </small>
              </div>


                </Card>

                </div>

                

                

            
          </div>
       
  );
};

export default Login;
