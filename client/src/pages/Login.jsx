// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { bankyLogo, loginImage } from "../assets/index";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userSchema = object({
    email: string().email("Invalid email").required(),
    password: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: userSchema,
    onSubmit: async (values, actions) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("http://localhost:8080/api/v1/users/login", values, config)
        .then((response) => {
          toast.success("Login Successful");
          actions.resetForm();
          dispatch(setCredentials(response.data));
          navigate(`/dashboard`);
        })
        .catch((error) => {
          // Handle error response
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred:", error.message);
          }
        });

    },
  });
  const { getFieldProps, errors , touched} = formik;
  return (
    <main className=" h-screen md:flex">
      <div className=" flex flex-col  justify-center items-center h-full md:w-[30%]  md:bg-primary-50">
        <div className="text-center flex flex-col justify-center">
          <img src={bankyLogo} />
          <h1 className="text-xl font-extrabold">Login</h1>
        </div>
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full px-10"
        >
          <div className="flex flex-col my-4">
            <label>Email Address</label>
            <input
              placeholder="example@gmail.com"
              name="email"
              id="email"
              className="bg-formBlue  p-2 my-3 rounded-lg"
              {...getFieldProps("email")}
            />
            {errors.email && touched.email ? (
              <div className="text-red-600 m-2">{errors.email}</div>
            ) : null}
          </div>

          <label>Password</label>
          <input
            className="bg-formBlue p-2 my-3 rounded-lg"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            name="password"
            id="password"
            {...getFieldProps("password")}
          />
          {errors.password && touched.password ? (
            <div className="text-red-600">{errors.password}</div>
          ) : null}
          <button
            type="submit"
            className="bg-primary-500 text-white rounded-lg px-4 py-2 mt-8"
          >
            Login
          </button>
          <span className="mb-2">
            Don&#39;t have an account?{" "}
            <Link className="text-[#3A36DB]" to={"/register"}>
              Register
            </Link>
          </span>
        </form>
      </div>
      <div className="hidden md:w-[70%] md:flex items-center justify-center">
        <img src={loginImage} className="h-[35rem]" />
      </div>
    </main>
  );
};

export default Login;
