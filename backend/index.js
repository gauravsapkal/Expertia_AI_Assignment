import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import connect from './db.js';
import addtask from './controllers/addtask.controller.js';
import gettasks from './controllers/gettasks.controller.js';
import register from './controllers/register.controller.js';
import login from './controllers/login.controller.js';
const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    return res.status(200).json({
        status: "success",
        message: "Welcome to this project",
      });
})
app.post("/register", register);
app.post("/login", login);
app.post("/tasks", addtask);
app.get("/tasks", gettasks);

// const connect = () => {
//   return mongoose.connect(
//     `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@cluster0.obuzm6f.mongodb.net/?retryWrites=true&w=majority`
//   );
// };

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});