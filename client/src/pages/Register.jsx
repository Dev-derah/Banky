// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [password, setPassword] = useState("");
    console.log(phoneNumber,firstName,lastName,email,password)
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input placeholder="Confirm Password" />
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
        <button type="button">Login</button>
      </form>
    </div>
  );
}

export default Register