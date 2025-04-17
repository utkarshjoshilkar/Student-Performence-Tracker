import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import userRoutes from "./routes/user.js";
import classRoutes from "./routes/class.js";
import studentRoutes from "./routes/student.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const CONNECTION_URL = process.env.DATABASE_URL;

const dbConnect = async()=>{
  try{
    await connect(CONNECTION_URL);
    console.log("Connected to db");
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}
dbConnect();

// app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/class", classRoutes);
app.use("/student", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student Progress Analyzer API");
});

const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(CONNECTION_URL)
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     })
//   )
//   .catch((err) => console.log(err.message));


app.listen(PORT,()=>{
  console.log("running on "+PORT);
})