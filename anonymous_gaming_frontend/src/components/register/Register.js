import { React, useContext } from "react";
import Context from "../../context/context";
import { Link } from "react-router-dom";

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

            <div >
                <label >
                  <h6 >Username</h6>
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

              <div >
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
                <label >
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
                    Sign up
                  </button>
                </div>
              </form>

              <div >
                <small >
                  <Link to="/login">
                    Login
                  </Link>
                </small>
              </div>


            </div>
         
  );
};

export default Register;
