import { connect } from "../../lib/db"
import Expuser from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

import dotenv from 'dotenv'

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

export default async function register(req, res) {

  await connect();

  const { method } = req;

  switch (method) {
    case 'POST': try {
      const user = req.body;
      let { username, email, password } = user;
      password = password + "";

      let existingUser = await Expuser.findOne({
        email,
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
          data: token,
        });
      }
    } catch (err) {
      return res.status(400).json({
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
