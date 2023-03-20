const express = require('express');
const userRouter = express.Router();
const {createUser, getUserByUsername, getAllUsers} = require('../db/User');
const jwt = require('jsonwebtoken');
//current route is /api/users

userRouter.use((req, res, next) => {
    next();
})

userRouter.get('/', async(req, res,next) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);
    } catch (error) {
        next(error)
    }
})

//POST /api/users/register
userRouter.post('/register', async(req, res, next) => {
    const {username, password} = req.body;
   
    try {
    
            const user = await createUser({username, password});
            const token = jwt.sign({id: user.id, username: user.username, email: user.email}, process.env.JWT)
            res.send({message: "thank you for signing up", token, user})
      
    } catch ({name, message, error}) {
        next({name, message, error})
    }

})



module.exports = userRouter;
