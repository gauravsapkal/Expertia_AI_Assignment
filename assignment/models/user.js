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

// export default mongoose.models.Pet || mongoose.model('Pet', PetSchema)

const Expuser = mongoose.models.expuser || mongoose.model('expuser', userSchema);

// module.exports = User;
export default Expuser;