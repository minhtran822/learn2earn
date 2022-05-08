const db = require("../models");

// Index
const index = (req, res) => {
    db.Feedback.find()
    .exec((err, allFeedback) => {
        if (err) return res.status(400).json({
            message: "Failure",
            error: err
        })
        return res.status(200).json({
            message: "Success",
            data: allFeedback
        })
    })
}

//Add user with the id same as the params passed
//TODO: Check how to add current user: possibly include current user's id along with the request
//TODO: Do we need to attach user's ID with every feedback? Is there a better way?
const create = async(req, res) => {
    try {
        //Validate user's existence
        const foundUser = await db.User.findById(req.params.id).populate();

        const feedback = new db.Feedback(req.body);
        feedback.userID = foundUser._id;
        const createdFeedback = await feedback.save();
        return res.status(200).json({
            message: "Feedback added",
            data: createdFeedback
        })
    } catch(err){
        return res.status(400).json({
            message: "Failure to add Feedback",
            error: err
        })
    }
}

//Retrieve Feedback by the req userID
const getByID = async(req, res) => {
    try{
        const foundFeedback = await db.Feedback.find({userID : req.params.id}).populate()
        return res.status(200).json({
            message: "Sucess",
            data: foundFeedback
        })
    } catch(err){
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    index,
    create,
    getByID
}