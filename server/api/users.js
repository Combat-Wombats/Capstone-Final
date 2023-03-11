const express = require('express');
const userRouter = express.Router();
const {createUser, getUserByUsername, authenticate} = require('../db/User');
const jwt = require('jsonwebtoken');
//current route is /api/users

userRouter.use((req, res, next) => {
    console.log('a request is being made');
    res.send({ message: 'hello from users' })
    next();
})

//POST /api/users/register
userRouter.post('/register', async(req, res, next) => {
    const {username, password} = req.body;
    console.log('username, pass', username, password)
    try {
        const users = await getUserByUsername(username);
        console.log('this is users', users)
        if(users){
            res.status(500).send({name: "message", message: `User ${username} is already taken`, error: "failed" })
        }
        else if(password.length < 8){
            res.status(500).send({name: " message", message: `Password is too short`, error: "Failed"})
        } else{
            const user = await createUser({username, password});
            console.log('this is user', user)
            const token = jwt.sign({id: user.id, username: user.username, email: user.email}, process.env.JWT)
            res.send({message: "thank you for signing up", token, user})
        }
        console.log(users)
    } catch ({name, message, error}) {
        next({name, message, error})
    }

})


module.exports = userRouter;