const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./utils/cronjob");
const http = require("http");
const PORT = process.env.PORT || 7777;

app.get("/", (req, res) => {
  res.send("DevTinder backend is live! 🚀");
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://developers-connect.netlify.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps, curl, etc

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed"), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chatRouter");
const initializeSocket = require("./utils/socket");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);
const server = http.createServer(app);

initializeSocket(server);


connectDB()
  .then(() => {
    console.log("MongoDB Connection Established");
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:"));
