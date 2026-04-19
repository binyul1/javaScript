import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "../../context/authContext"
import Cookies from "js-cookie";
import axiosInstance from "../../config/apiClient";
import type { ICredentials, ILoginResponse, IUserDetail } from "../../types/auth-type";

const AuthProvider = ({ children }: Readonly<{children: ReactNode}>) => {
    const [loggedInUser, setLoggedInUser] = useState<null | IUserDetail>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = async (credentials: ICredentials) => {
        try {
            const response = await axiosInstance.post("/auth/login", credentials) as ILoginResponse
            Cookies.set("_at_62", response.accessToken);
            Cookies.set("_rt_62", response.refreshToken);

            const userDetail = await getLoggedInUser();
            return userDetail;
        } catch (exceptation) {
            console.log(exceptation)
        }
    }

    const getLoggedInUser = async () => {
        try {
            const response = await axiosInstance.get("/auth/me") as IUserDetail
            setLoggedInUser(response);
            console.log(response)
            return response;
    
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const token = Cookies.get("_at_62");
        if (token) {
            getLoggedInUser();
        } else {
            setLoading(false);
        }
    }, []);

    return loading ? (
        <>Loading ...</>) : (
        <AuthContext.Provider value={{
            loggedInUser: loggedInUser,
            login: login,
            getLoggedInUser: getLoggedInUser,
        }}>
            {children}
        </AuthContext.Provider>
    );

}
export default AuthProvider;