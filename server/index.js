import express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./mongodb/connect.js";
import userRouter from './routes/user.routes.js';
import accountRouter from "./routes/account.routes.js";
import accountTypeRouter from './routes/accountType.routes.js'
import paystackRouter from './routes/paystack.routes.js'
import "./utils/addRequire.js";
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json({limit:'50mb'}));


app.use("/api/v1/users",userRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/accountTypes", accountTypeRouter);
app.use("/api/v1/paystack", paystackRouter);

const startServer= async()=> {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,()=>console.log('server started at port 8080'))
    }catch(error){
        console.log(error)
    }
}

startServer()