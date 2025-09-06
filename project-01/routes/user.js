const express = require('express');
const { handleGetAllUsers, handleGetUser, handlePostUser, handlePatchUser, handleDeleteUser } = require('../controllers/user');

const router = express.Router();

// router.get('/', (req, res)=>{
//     res.setHeader("x-name", "Pritom Biswas");
//     // Always add X to custom headers
//     console.log(req.headers);
    
//     return res.json(users);
// });

router.get('/', handleGetAllUsers);

router.get('/:id', handleGetUser);

router.post('/', handlePostUser);

router.patch('/:id', handlePatchUser);

router.delete('/:id', handleDeleteUser);

module.exports = router;