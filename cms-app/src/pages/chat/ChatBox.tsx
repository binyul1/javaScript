import {
  useCallback,
  useEffect,
  useState,
  type BaseSyntheticEvent,
} from "react";
import { useParams } from "react-router";
import axiosInstance from "../../config/apiClient";
import { toast } from "sonner";
import type { IUserDetail } from "../../types/auth-type";
import { useAuth } from "../../lib/hook/auth-hook";
import socket from "../../config/socketConfig";

export default function ChatBox() {
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState("");
  const [activeUser, setActiveUser] = useState<IUserDetail>();
  const { loggedInUser } = useAuth();

  const params = useParams();

  const getActiveUser = useCallback(async () => {
    try {
      const userDetail = await axiosInstance.get("/user/" + params.userId);
      setActiveUser(userDetail.data);
    } catch (exceptation) {
      console.log(exceptation);
    }
  }, [params.userId]);
  const getAllMessages = async () => {
    try {
      const response = await axiosInstance.get("/chat/" + params.userId, {
        params: { limit: 30 },
      });
      setMessages(response.data);
    } catch (exceptation) {
      toast.error("Error fetching messages");
      console.log(exceptation);
    }
  };

  const formatTime = (timestamp?: string | number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (!Number.isFinite(date.getTime())) {
      const value = String(timestamp);
      return value.length >= 5 ? value.slice(0, 5) : value;
    }
    const utcMillis = date.getTime();
    const kathmanduOffsetMinutes = 5 * 60 + 45;
    const kathmanduMillis = utcMillis + kathmanduOffsetMinutes * 60 * 1000;
    const kathmanduDate = new Date(kathmanduMillis);
    const hours = kathmanduDate.getUTCHours().toString().padStart(2, "0");
    const minutes = kathmanduDate.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const newMessageHandle = (data) => {
      getAllMessages();
    };
    socket.on("messageRecieved", newMessageHandle);
    return () => {
      getActiveUser();
      getAllMessages();
      socket.off("messageRecieved", newMessageHandle);
    };
  }, []);

  const submitChat = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const messageDetail = {
        message: message,
        sender: loggedInUser?._id,
        receiver: activeUser?._id,
      };
      const response = await axiosInstance.post("/chat", messageDetail);
      socket.emit("newMessageSend", response.data);
      setMessage("");
    } catch (exceptation) {
      toast.error("Error sending message");
      console.log(exceptation);
    }
  };
  return (
    <section className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white shadow-xl">
        <div className="rounded-t-[30px] border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-300">
                <img
                  src={
                    import.meta.env.VITE_APP_ASSETS_URL +
                    "/uploads/users/" +
                    activeUser?.image?.filename
                  }
                  alt={activeUser?.firstName}
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">
                  {activeUser?.firstName + " " + activeUser?.lastName || "Chat"}
                </p>
                <p className="text-xs text-slate-500">{activeUser?.username}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-[360px] overflow-y-auto space-y-4 px-5 py-5">
          {messages &&
            messages.map((row, index) =>
              row.sender !== activeUser?._id ? (
                <div className="flex justify-end" key={index}>
                  <div className="max-w-[80%] rounded-3xl rounded-bl-sm bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                    <p>{row.message}</p>
                    <span className="mt-2 inline-block text-[10px] text-slate-500">
                      {formatTime(row.createdAt)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start" key={index}>
                  <div className="max-w-[80%] rounded-3xl rounded-bl-sm bg-blue-600 px-4 py-3 text-sm leading-6 text-white shadow-sm">
                    <p>{row.message}</p>
                    <span className="mt-2 inline-block text-[10px] text-slate-200">
                      {formatTime(row.createdAt)}
                    </span>
                  </div>
                </div>
              ),
            )}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t bg-white">
          <form className="flex items-center space-x-3" onSubmit={submitChat}>
            <input
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              defaultValue={message}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 font-medium transition focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
