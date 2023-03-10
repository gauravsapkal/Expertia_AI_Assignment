// import Expuser from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

import dotenv from 'dotenv'
import Expuser from "../models/user.model.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET
  );
}

const register = async(req, res)=> {
try {
      const user = req.body;
      let { username, email, password } = user;
      password = password + "";
      
      let existingUser = await Expuser.findOne({
        $or:[
            {email:email},
            {username, username}
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "User already exists",
        });
      } else {
        password = bcrypt.hashSync(password);
        let user = await Expuser.create({
          username,
          email,
          password,
        });
        user = user.toJSON();
        delete user.password;

        let token = generateToken(user);

        return res.status(200).json({
          status: "success",
          data: {
            token
          },
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: "error",
        data: "Invalid Credientials",
      });
    }
}

export default register
