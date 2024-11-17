import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { eventRouter, mailRouter, authRouter } from "./routes/index.js";
import { SendEmail } from "./middlewares/index.js";
import { connectMongo } from "./utils/db.js";

config();
const port = process.env.PORT || 8080;
export const app = express();

connectMongo(process.env.MONGO_URI);

export const emailQueue = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public')); 
app.use("/email", mailRouter);
app.use("/event", eventRouter);
app.use("/auth", authRouter)

app.get("/api/test", (req, res)=>{
  res.status(200).json({message:"Hello, World"})
})

setInterval(() => {
  const email = emailQueue.shift();
  if (email) {
    let response = SendEmail(email);
    let count = 5;
    while (response instanceof Error && count > 0) {
      response = SendEmail(email);
      count--;
    }
  }else{
    console.log("Array empty");
  } 
}, 10000);

app.listen(port, () => {
  console.log(`Server Working on http://localhost:${port}`);
});
