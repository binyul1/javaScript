import { useEffect, useState } from "react";
import socket from "../../config/socketConfig";
import { toast } from "sonner";
import { useAuth } from "../../lib/hook/auth-hook";

export const AllUser = () => {
  const [msg, setMessage] = useState<string>("");
  const [allMsg, setAllMsg] = useState<
    Array<{ user: string; message: string }>
  >([]);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    const handleHiReturn = (value: { data: Record<string, string> }) => {
      console.log(value);
      setAllMsg(() => {
        return [...allMsg, value]
      })
      toast.success("You Recieved from" + " " + value.data.user, {
        description: value.data.message,
      });
    };
    socket.on("HIRecieved", handleHiReturn);
    return () => {
      socket.off("HIRecieved", handleHiReturn);
    };
  }, []);

  console.log(allMsg);
  return (
    <>
      User List
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="border border-black"
      />
      <button
        onClick={() => {
          setAllMsg(() => {
            return [...allMsg, { user: loggedInUser?.firstName, message: msg }];
          });
          socket.emit("Recieved", { user: loggedInUser?.firstName, message: msg });
        }}
      >
        Send Notification
      </button>
    </>
  );
};
