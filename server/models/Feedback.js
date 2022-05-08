const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    userID : {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },

    feedback: {
        type: String,
        required: true
    },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;