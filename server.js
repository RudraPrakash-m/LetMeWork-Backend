const express = require("express");
const connectDB = require("./congig/db/db");
const public_router = require("./routes/publicRoute");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user_route/userRoute");
const retiredUserRouter = require("./routes/user_route/retireduserRoute");
const adminRouter = require("./routes/adminRoute");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

connectDB();

app.use("/api", public_router);

app.use("/user", userRouter);

app.use("/ruser", retiredUserRouter);

app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
