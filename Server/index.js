import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import connectDb from './Config/connectDb.js';

// --------------------------------------------------------------------------------------
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
// --------------------------------------------------------------------------------------

const PORT = process.env.PORT || 3500;
const app = express();
connectDb()

// --------------------------------------------------------------------------------------

app.use(cors({
    origin: 'http://localhost:3000',
    // origin: '*',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));        //FormData  
app.use(express.json());
app.use(cookieParser());

//  -------------------------------------------------------------------------------------

app.get('/', async(req,res)=>{

    console.log(req.cookies);

    const userLocation = req.cookies?.userLocation;
    if(!userLocation){
        return res.json(400).json({message: 'location is requrired is not precise then city'});
    }

    return res.json({message: 'hello at path /'});
})



// --------------------------------------------------------------------------------------
app.use('/auth', authRouter);
app.post('/user', userRouter);

// ---------------------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));