import express from  "express";
import mongoose from "mongoose";
import router from "./Routes/userRoutes";
import blogsRouter from "./Routes/blogRoutes";
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogsRouter);

const uri =`mongodb+srv://${name}:${pass}@${dbname}.mrjpenl.mongodb.net/?retryWrites=true&w=majority`;
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(uri, options
//     , function (error) {
//     if (error) {
//       console.log("unable to connect DB ", error);
//     }
//   }
).catch((error)=>{console.log(error)})

app.listen(5001, () => {
    console.log("Server up and running. listening to port", 5001);
})
  
