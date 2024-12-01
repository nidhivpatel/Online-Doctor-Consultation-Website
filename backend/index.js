import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import doctorRoutes from "./routes/doctor.js";
import appointmentRoutes from "./routes/appointment.js";
import chatRoutes from "./routes/chat.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/chat", chatRoutes);

const CONNECTION_URL = //"mongodb://localhost:27017/MyDb";
  "mongodb+srv://onlinedoctor:onlinedoctor@cluster0.2cjnd.mongodb.net/AppData?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error.message));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
