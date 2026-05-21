import { type Request, type Response, type NextFunction } from "express";

const AuthCheck = () => {
    return(req: Request, res: Response, next: NextFunction) =>{
        console.log("I am in auth check middleware")
        // Todo: check if user is logged in or not
        // next execute
        next(); 
    }
}

export default AuthCheck;