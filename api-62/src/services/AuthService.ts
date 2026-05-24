import type{ Request } from "express";
import bcrypt from "bcryptjs";

class AuthService{
    static mapUserDataForRegister(req:Request){
        const data = req.body;
              if (!data.role) {
                data.role = "user";
              }
              //password -> plaintext
        
              data.password = bcrypt.hashSync(data.password, 12);
        
              if (req.file) {
                data.image = {
                  originalName: req.file.originalname,
                  filename: req.file.filename,
                  size: req.file.size,
                  destination: req.file.destination,
                };
              }
              return data;
    }
    
}



export default AuthService;