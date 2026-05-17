import express, {type Request, type Response, type NextFunction} from "express";

class ProductController {
    create = (req: Request, res: Response, next: NextFunction) => {
        res.json({ message: "Product created successfully." });
    }}
    
export default ProductController;