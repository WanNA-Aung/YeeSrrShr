// User Modal
const User = require("../model/User")

// JWT
const jwt = require("jsonwebtoken"); 

// bcrypt
const bcrypt = require("bcrypt")

// get createError function
const {createError} = require("./../errorHandler/createError")


// sign-up
exports.SignUp = async (req, res, next) => {
    try{
        // Chack User ALready exists
        const isUser = await User.findOne({ email: req.body.email })

        if(isUser) createError(400, "User with this email already exist , Please login.")

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 12)

        // Create User
        const user = new User({...req.body, password: hashedPassword})

        // Save User
        const savedUser = await user.save();

        // take user data
        const {password, ...other} = savedUser._doc

        const token = await jwt.sign({userId : savedUser._id}, process.env.SECRET_KEY)

        // return user
        return res
        .cookie("Access_cookie", token, {
            httpOnly: true,
            maxAge: 10080 * 60 * 1000
        })
        .status(201)
        .json(other)


    }catch(err){
        next(err)
    }
}


exports.SignIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(!user) createError(404, "Invalid Email Or Password . ")

        const isAuth = await bcrypt.compare(req.body.password, user.password)

        if(!isAuth) createError(401, "Invalid Email Or Password . ")

        const {password, ...other} = user._doc

        // create JWT token 
        const token = await jwt.sign({userId : user._id}, process.env.SECRET_KEY)

        // return user
        return res
        .cookie("Access_cookie", token, {
            httpOnly: true,
            maxAge: 10080 * 60 * 1000
        })
        .status(201)
        .json(other)


    } catch (error) {
        next(error)
    }
}