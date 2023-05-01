// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { object, string, number} from "yup";
import {useFormik} from 'formik';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    let userSchema = object({
      firstName: string().required().label("firstName"),
      lastName: string().required(),
      phoneNumber: number().required().positive().integer(),
      email: string().email('Invalid email').required(),
      password: string()
        .required()
        .min(6, "password must be more than 6 characters long"),
    });

    const formik = useFormik({
        initialValues:{
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            password:'',
        },
        validateOnBlur:false,
        validateOnChange:false,
        validationSchema: userSchema,
        onSubmit: async (values,actions)=>{
            axios
              .post("http://localhost:8080/api/v1/users/register", values)
              .then((response) => {
                // Handle the response
                localStorage.setItem({key:"user",value:JSON.stringify(response.data)});
                navigate('/login')
              })
              .catch((error) => {
                // Handle the error
                console.error(error);
              });
            actions.resetForm()
        },
    });
    const { getFieldProps, errors} = formik;

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="firstName"
          id="firstName"
          placeholder="First Name"
          {...getFieldProps("firstName")}
        />
        <span>{errors.firstName}</span>
        <input
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          {...getFieldProps("lastName")}
        />
        <span>{errors.lastName}</span>
        <input
          name="email"
          id="email"
          placeholder="email"
          {...getFieldProps("email")}
        />
        <span>{errors.email}</span>
        <input
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          {...getFieldProps("phoneNumber")}
        />
        <span>{errors.phoneNumber }</span>
        <input
          name="password"
          id="password"
          placeholder="Password"
          {...getFieldProps("password")}
        />
        <span>{errors.password }</span>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register