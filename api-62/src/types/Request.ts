import { Request } from "express";


export interface IUserDetail{
    image?: {
        originalName: string | null;
        fileName: string | null;
        destination: string | null;
        size: number | null;
    } | null;
    _id: string;
    firstName: string;
    email: string;
    lastName: string;
    username: string;
    maidenName: string | null | undefined;
    phone: string | null ;
    role: string;   
}

export interface AuthRequest extends Request{
    loggedInUser?: IUserDetail;
}