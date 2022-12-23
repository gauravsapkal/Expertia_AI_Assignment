import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import Exptask from '../models/task.model.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const gettasks = async (req, res)=>{

    try {

        let token = req.headers.authorization || '';
        
        let result = jwt.verify(token, JWT_SECRET);

        if(result){
            const todo = req.body;

            let data = await Exptask.find({userid:result._id});

              return res.status(200).json({
                status: "success",
                data
            });

        }else{
            return res.status(400).json({
                status: "error",
                data: "Not Authorised",
            });
        }


    } catch (err) {
        return res.status(400).json({
            status: "error",
            data: "Not Authorised",
        });
    }
}


export default gettasks;