const userModel = require('../models/userModel');
const catchAsyncError = require('./catctAsyncError')
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: '../config/config.env' });

exports.isAuthenticatedUser = catchAsyncError(
    async (req, res, next) => {

        const { token } = req.cookie;
        console.log(token);

        if (!token) {
            return next(new ErrorHandler("Please Login to access this resoure", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRETKEY);
        // console.log(decodedData);

        next();
        return req.user = await userModel.findById(decodedData.id);
    }
)