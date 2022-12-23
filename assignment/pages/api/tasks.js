import { connect } from "../../lib/db";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import Exptask from "../../models/tasks";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

export default async function tasks(req, res) {
    const { method } = req;
    await connect();

    switch (method) {
        case 'POST': try {

            let token = req.headers.authorization || '';
            
            let result = jwt.verify(token, JWT_SECRET);

            if(result){
                
                const todo = req.body;

                const { task } = todo;
                let today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                let date = dd + '/' + mm + '/' + yyyy;

                let count = await Exptask.find({
                    userid: result._id, date:date
                }).count();

                if(count==5){
                    return res.status(400).json({
                        status: "error",
                        data:"daily limit exceed"
                    }); 
                }

                let data = await Exptask.create({
                    task,
                    userid: result._id,
                    date
                  });

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
            break;




        case 'GET': try {

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
            break;


        default:
            res.status(400).json({ data: "Something went wrong! Bad Gateway" })
            break
    }
}
