const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    deadline: { type: Date, required: true },
    isCompleted:{type:Boolean,required:false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model("Todos",TodoSchema);