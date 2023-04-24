// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input placeholder="email" />
        <input placeholder="Password" />
        <button type="button">Login</button>
        <span>
          Don&#39;t have an account? <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login