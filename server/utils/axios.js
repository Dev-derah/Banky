import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // replace with your server's URL
  timeout: 10000,
});

module.exports = api;
