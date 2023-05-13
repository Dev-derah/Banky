// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string, number } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerImage, bankyLogo } from "../assets/index";

const Register = () => {
  const navigate = useNavigate();
  let userSchema = object({
    firstName: string().required().label("firstName"),
    lastName: string().required(),
    phoneNumber: number().required().positive().integer(),
    email: string().email("Invalid email").required(),
    password: string()
      .required()
      .min(6, "password must be more than 6 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: userSchema,
    onSubmit: async (values, actions) => {
      axios
        .post("http://localhost:8080/api/v1/users/register", values)
        .then(() => {
          toast.success("Registration Successful");
          actions.resetForm();
          navigate("/login");
        })
        .catch((error) => {
          // Handle error response
          if (error.response) {
            const data = error.response.data;
            toast.error(data.message);
          } else {
            toast.error("An error occurred:", error.message);
          }
        });
    },
  });
  const { getFieldProps, errors, touched } = formik;

  return (
    <main className=" h-screen md:flex">
      <div className=" flex flex-col  justify-center items-center h-full md:w-[30%]  md:bg-primary-50">
        <div className="text-center flex flex-col justify-center">
          <img src={bankyLogo} />
          <h1 className="text-2xl font-black">Register</h1>
        </div>
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full px-10"
        >
          <div className="flex flex-col my-2">
            <label>First Name</label>
            <input
              name="firstName"
              id="firstName"
              placeholder="First Name"
              {...getFieldProps("firstName")}
              className={`bg-formBlue  p-2 my-1 rounded-lg ${
                errors.firstName && touched.firstName
                  ? "border border-red-600"
                  : "border-none"
              }`}
            />
            {errors.firstName && touched.firstName ? (
              <span className="text-red-600 text-xs">{errors.firstName}</span>
            ) : null}
          </div>
          <div className="flex flex-col my-2">
            <label>Last Name</label>
            <input
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              {...getFieldProps("lastName")}
              className={`bg-formBlue  p-2 my-1 rounded-lg ${
                errors.lastName && touched.lastName
                  ? "border border-red-600"
                  : "border-none"
              }`}
            />
            {errors.lastName && touched.lastName ? (
              <span className="text-red-600 text-xs">{errors.lastName}</span>
            ) : null}
          </div>
          <div className="flex flex-col my-2">
            <label>Email Address</label>
            <input
              placeholder="example@gmail.com"
              name="email"
              id="email"
              className={`bg-formBlue  p-2 my-1 rounded-lg ${
                errors.email && touched.email
                  ? "border border-red-600"
                  : "border-none"
              }`}
              {...getFieldProps("email")}
            />
            {errors.email && touched.email ? (
              <span className="text-red-600 text-xs">{errors.email}</span>
            ) : null}
          </div>
          <div className="flex flex-col my-2">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              {...getFieldProps("phoneNumber")}
              className={`bg-formBlue  p-2 my-1 rounded-lg ${
                errors.phoneNumber && touched.phoneNumber
                  ? "border border-red-600"
                  : "border-none"
              }`}
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <span className="text-red-600 text-xs">{errors.phoneNumber}</span>
            ) : null}
          </div>
          <div className="flex flex-col my-2">
            <label>Password</label>
            <input
              className={`bg-formBlue  p-2 my-1 rounded-lg ${
                errors.password && touched.password
                  ? "border border-red-600"
                  : "border-none"
              }`}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              name="password"
              id="password"
              {...getFieldProps("password")}
            />
            {errors.password && touched.password ? (
              <span className="text-red-600 text-xs">{errors.password}</span>
            ) : null}
          </div>
          <button className="bg-primary-500 text-white rounded-lg px-4 py-2 mt-5">
            Register
          </button>
          <span className="mt-2">
            Already have an account?{" "}
            <Link className="text-[#3A36DB]" to={"/login"}>
              Login
            </Link>
          </span>
        </form>
      </div>
      <div className="hidden md:w-[70%] md:flex items-center justify-center">
        <img src={registerImage} className="h-[35rem]" />
      </div>
    </main>
  );
};

export default Register;
