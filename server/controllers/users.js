const db = require("../models")
const bcrypt = require("bcryptjs");


// Index
const index = (req, res) => {
    db.User.find()
    .exec((err, allUsers) => {
        if (err) return res.status(400).json({
            message: "Failure",
            error: err
        })
        return res.status(200).json({
            message: "Success",
            data: allUsers
        })
    })
}

// Show
const show = async (req, res) => {
    // req.params.id => req.userId
    // After login setup, need to change id with(login user id)
    // maybe same with destory function (delete user)
    // can't figure out how to get the profile with req.userId
    // so use req.param.id
    try {
        const foundUser = await db.User.findById(req.params.id).populate()
        return res.status(200).json({
            message: "Success",
            data: foundUser
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

// Create
const create = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt)
        const user = new db.User(req.body);
        user.password = hash
        const createdUser = await user.save();
        return res.status(200).json({
            message: "User Created",
            data: createdUser
        })
    } catch(err) {
        return res.status(400).json({
            message: "Failure",
            error: err,
        })
    }
};

//Update
const update = async (req, res) => {

    try {
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(req.body.password, salt)

        const foundUser = await db.User.findById(req.params.id)
        const updatedUser = await db.User.findByIdAndUpdate(
            {_id : foundUser._id},
            req.body,
            { new: true }
        )
        // updatedUser.password = hash
        return res.status(201).json({ 
            message: "User Updated", 
            data: updatedUser
        })
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
};

// Delete
const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) =>{
        if (err) 
        return res.status(400).json({
            message: "Failure",
            error: err
        })
        return res.status(200).json({
            message: "User Deleted",
            data: deletedUser
        })    
    })
}

//Do we need to make this into a separate controller?

//Add Feedback by the current user
//Have not checked if this worked yet, Have not attached the method to a route and API.
//TODO: Check how to add current user: possibly include current user's id along with the request
//TODO: Do we need to attach user's ID with every feedback? Is there a better way?
const addFeedback = async(req, res) => {
    try {
        //Do we need to validate the userID before creation?
        const feedback = new db.Feedback(req.body);
        feedback.userID = req.params.id;
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
const getFeedback = async(req, res) => {
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
    show,
    create,
    update,
    destroy,
    addFeedback,
    getFeedback
}