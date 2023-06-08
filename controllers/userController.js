
const userModel = require('../models/userModel');
const catchAsyncError = require('../middleware/catctAsyncError');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');

//Register User
exports.registerUser = catchAsyncError(
    async (req, res, next) => {

        const { name, email, password, secretCode } = req.body;

        const user = await userModel.create(
            {
                name, email, password, secretCode
            }
        );

        sendToken(user, 201, res);
    }
)

//Login User
exports.loginUser = catchAsyncError(
    async (req, res, next) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }

        const user = await userModel.findOne({ email: email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password, user.password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
            // return res.status(401).json({ message: "Invalid Email or Password" });
        }

        sendToken(user, 200, res);
    }
)

//Logout User

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: false
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

//deleteUser

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    // console.log(id);

    const user = await userModel.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    else {
        const deletedUser = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User Deleted"
        })
    }

})


//Get Single User

exports.getSingleUserList = catchAsyncError(
    async (req, res, next) => {

        const user = await userModel.findById(req.user.id);

        res.status(200).json({
            success: true,
            list: user.list
        })
    }
)
