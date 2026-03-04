import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './Routes/user.routes.js';
import authRouter from './Routes/auth.routes.js';
import subscriptionRouter from './Routes/subscription.routes.js';
import connectToDatabase from './Database/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import {sendReminders} from './config/workflow.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use('/api/v1/workflow/subscription/reminder', sendReminders);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware);


app.get('/', (req, res)=>{
    res.send("Welcome to the subscription tracker API");
});

app.listen(PORT, async()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    await connectToDatabase();
});