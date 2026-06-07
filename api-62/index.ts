import http from "http";
import app from "./src/app";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server,{
  cors: {
    origin: "*",
  }
});

// event based
  // fire/trigger/call
  // listen/ listner
  // io.emit("")

  io.on("connection",(socket) => {
    console.log("Connected Client:", socket.id);
    socket.on("Recieved",(data) => {
      console.log("Data from client: ", data);
      socket.broadcast.emit("HIRecieved", {data: data});
    })
  })


//TODO: To put these configs in .env
//listen
const HOST = "127.0.0.1";
//0-(2^16-1)
const PORT = 9005;

server.listen(PORT, HOST, () => {
  // if (err) {
  //   console.log(err);
    //   console.log("Server error: ", err.message);
    //   process.exit(1);
  // } else {
  console.log("Server is running on " + PORT);
  console.log("To disconnect, press CTRL+C");
  //}
});

server.on("error", (err) => {
  console.log(err)
  console.log("Server error: ", err.message);
  process.exit(1);
});
