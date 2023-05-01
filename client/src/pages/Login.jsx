// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import { object, string} from "yup";
import { useFormik } from "formik";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    let userSchema = object({
      email: string().email('Invalid email').required(),
      password: string()
        .required(),
    });

    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: userSchema,
      onSubmit: async (values, actions) => {
        await axios
          .post("http://localhost:8080/api/v1/users/login", values)
          .then((response) => {
            // Handle the response
            const data = response.data;
            actions.resetForm();
            navigate(`/dashboard/${data.user._id}`);
          })
          .catch((error) => {
            // Handle the error
            alert(error.message);
          });
        
      },
    });
    const { getFieldProps, errors } = formik;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="email"
          name="email"
          id="email"
          {...getFieldProps("email")}
        />
        <span>{errors.email}</span>
        <input
          placeholder="Password"
          name="password"
          id="password"
          {...getFieldProps("password")}
        />
        <span>{errors.password}</span>
        <button type="submit">Login</button>
        <span>
          Don&#39;t have an account? <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login