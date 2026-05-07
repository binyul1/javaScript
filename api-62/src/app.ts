import express, { type Application,type Request, type Response, type NextFunction } from 'express';
//express application
const app: Application = express(); //server-side application
//for any method
// app.use('/');

app.get('/',(req:Request, res:Response, next:NextFunction)=>{
    // res.end("Hello world");
    res.json({
        data:"Helth ok",
        message: "Success",
        meta:null,
        // errors:null,
    })
});

app.post('/auth/login',(req:Request, res:Response, next:NextFunction)=>{
    res.json({
        data:{
            accessToken:"",
            refreshToken:"",
        },
        message: "Login Success",
        meta:null,
    })
});

//method bind
// app.post('/');
// app.put('/');
// app.delete('/');
// app.patch('/');

export default app;