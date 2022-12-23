import { connect } from "../../lib/db"
import Expuser from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

import dotenv from 'dotenv'

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

export default async function login(req, res) {

  await connect();

  const { method } = req;

  switch (method) {
    case 'POST': try {
      const user = req.body;
  
      let { email, password } = user;
      password = password + "";
      
      let existingUser = await Expuser.findOne({
        email,
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
    break;


    default:
      res.status(400).json({ data: "Something went wrong! Bad Gateway" })
      break

  }
}
