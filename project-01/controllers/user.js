const User = require("../models/user.js");

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleGetUser(req, res) {
     try {
        const user = await User.findById(req.params.id);
        const id = parseInt(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "failed"
        })
    }
}

async function handlePostUser(req, res) {
    try {
        const body = req.body;
        console.log(body);
        
        users.push({...body, id: users.length+1});
        
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        });

        console.log(result);
        
        return res.status(201).json({
            msg: "success",
            data: result
        });
    } catch (error) {
        
    }
}
async function handlePatchUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {...req.body});
        return res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed"
        })
    }
}
async function handleDeleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id, {...req.body});
        return res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed"
        })
    }
}



module.exports = {
    handleGetAllUsers,
    handleGetUser,
    handlePostUser,
    handlePatchUser,
    handleDeleteUser
}