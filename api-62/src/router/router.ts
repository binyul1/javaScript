import express, {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

//router
const router: Router = Router();

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: "Health ok",
    message: "Success",
    meta: null,
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: {
      accessToken: "",
      refreshToken: "",
    },
    message: "Login Success",
    meta: null,
  });
};

const getUserDetailId = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params;
  const query = req.query;

  // {key:value} => {string: value}
  //TODO: db query for fetching the user detail
  const data = {
    id: params.userId,
    query: query,
  };

  res.json({
    data: data,
    message: "user detail",
    meta: null,
  });
};

//for any method
// app.use('/');
// this method accepts any method type for given url
// app.use('path' ,(req:Request, res:Response, next:NextFunction)=>{// definition her s });
router.get("/", healthCheck);

router.post("/auth/login", login);

//parameterized route
router.get("/user/:userId", getUserDetailId);

//method bind
// app.post('/');
// app.put('/');
// app.delete('/');
// app.patch('/');

export default router;
