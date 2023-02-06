import { React, useContext } from "react";
import Context from "../../context/context";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';



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

  return (
    
          
          <div >
           

              <div>
                <label >
                  <h6 >Email Address</h6>
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

              <form onSubmit={onSubmitForm} >
                <label>
                  <h6 >Password</h6>
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  value={password}
                  name="password"
                  placeholder="Enter password"
                />
                <div >
                  <button type="submit" >
                    Login
                  </button>
                </div>
              </form>

             
                <small >
                  Don't have an account?
                  <span> </span>
                  <Link to="/register" >
                    Sign up
                  </Link>
                </small>
            


            
          </div>
       
  );
};

export default Login;
