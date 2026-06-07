import { useEffect } from "react"
import socket from "../../config/socketConfig"
import { AllUser } from "./AllUser";

export default function UserList() {
    

    useEffect(() => {
        socket.connect();
    }, [])
    return(<>
        <AllUser/>
    </>)
}

