import { useContext } from "react"
import AuthContext from "../../context/authContext"

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    return{
        // loggedInUser: authContext.loggedInUser
        ...authContext
    }
}