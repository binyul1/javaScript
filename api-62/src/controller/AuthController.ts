import express, {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

class AuthController {
  login = (req: Request, res: Response, next: NextFunction) => {
    //data
    const credentials = req.body;
    // validate the credentials
    

    res.json({
      data: credentials,
      message: "Login Success",
      meta: null,
    });
  };

  getUserDetailId = (req: Request, res: Response, next: NextFunction) => {
    // this function or route is only accessed by loggedin User =>
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

  getLoggedInUserDetail(req: Request, res: Response, next: NextFunction) {
    res.json({
      data: {
        id: "1234",
      },
      name: "John Doe",
      email: "john.doe@example.com",
    });
  }
}
export default AuthController;
