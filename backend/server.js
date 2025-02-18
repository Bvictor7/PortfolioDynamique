require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const skillRoutes = require("./src/routes/skillRoutes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middlewares/errorHandler");
const imageRoutes = require("./src/routes/imageRoutes");

connectDB();

const app = express();

const corsParams = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsParams));

app.use(express.json());

app.use(cookieParser());


//Utilisations des routes pour skills et users
app.use("/api/skills", skillRoutes);

app.use("/api/users", userRoutes);

app.use("/upload", imageRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sous http://localhost:${PORT}`);
});
