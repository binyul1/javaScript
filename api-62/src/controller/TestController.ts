import { type Request, type Response, type NextFunction } from "express";
 
export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    res.json({
      data: "Health ok",
      message: "Success",
      meta: null,
    });
  };

export default healthCheck;
