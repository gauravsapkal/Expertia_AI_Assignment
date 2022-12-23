import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        "task" : {type: String},
        "userid" : {type: String},
        "date" : {type: String},
    },
    {
        versionKey: false
    }
)

// export default mongoose.models.Pet || mongoose.model('Pet', PetSchema)

const Exptask = mongoose.models.exptask || mongoose.model('exptask', taskSchema);

// module.exports = User;
export default Exptask;