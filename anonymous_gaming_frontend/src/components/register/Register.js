import { React, useContext } from "react";
import Context from "../../context/context";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Register = ({ setAuth }) => {
  const context = useContext(Context);
  const { username, email, password } = context.inputs;

  console.log(username, email, password);

  const onChange = (e) => {
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
   
          <div >

            <AppBar position="fixed">
              <Toolbar>
              <Typography variant="h6" noWrap component="div">
                AnonymousGaming
              </Typography>

              </Toolbar>

            </AppBar>

          <Card sx={{ mt:6, pt:18, mx:40, pb:57}}  >
            
          <Grid> 

          <Grid item xs={8}>
            <div >
                <label className="px-2">
                  <h3 >Username:</h3>
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  value={username}
                  type="text"
                  name="username"
                  class="mb-4"
                  placeholder="Enter a username"
                />
              </div>
            </Grid>


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
                  class="mb-4"
                  placeholder="Enter a valid email address"
                />
              </div>
              </Grid>

              <Grid item xs={8}>
              <form onSubmit={onSubmitForm} >
                <label className="px-2">
                  <h3 >Password:</h3>
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  value={password}
                  name="password"
                  placeholder="Enter password"
                />
                <div className="my-2">
                  <Button variant="contained" type="submit"> Sign UP</Button>

                </div>
              </form> 
              </Grid>

              </Grid>

              <div >
                <small >
                Already have an account? 
                <span> </span>
                  <Link to="/login">
                    Login
                  </Link>
                </small>
              </div>
              </Card>

            </div>
         
  );
};

export default Register;
