// import Expuser from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

import dotenv from 'dotenv'
import Expuser from "../models/user.model.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

function generateToken(existingUser) {
  return jwt.sign(
    {
      "_id": existingUser._id,
      "username": existingUser.username,
      "email": existingUser.email,
    },
    JWT_SECRET
  );
}

const login = async(req, res)=>{
    
  try {
      const user = req.body;
  
      let { username, password } = user;
      password = password + "";
      
      let existingUser = await Expuser.findOne({
        username,
      });
  
      if (existingUser) {
        let match = bcrypt.compareSync(password, existingUser.password);
        if (match) {
          let token = generateToken(existingUser);
          return res.status(200).send({
            status: "success",
            data: {
              token,
            },
          });
        } else {
          return res.status(400).send({
            status: "error",
            message: "Password is wrong",
          });
        }
      } else {
        return res.status(400).send({
          status: "error",
          message: "User does not exist",
        });
      }
    } catch (err) {
      return res.status(400).send({
        status: "error",
        data: "Invalid Credientials",
      });
    }
}


export default login;