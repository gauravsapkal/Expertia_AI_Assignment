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

const Exptask = mongoose.models.exptask || mongoose.model('exptask', taskSchema);

export default Exptask;