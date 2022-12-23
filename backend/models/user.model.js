import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        "username" : {type: String},
        "email" : {type: String},
        "password" : {type: String},
    },
    {
        versionKey: false
    }
)

const Expuser = mongoose.models.expuser || mongoose.model('expuser', userSchema);

export default Expuser;