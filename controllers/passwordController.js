const passwordModel = require('../models/passwordModel');
const catchAsyncError = require('../middleware/catctAsyncError');
const ErrorHandler = require('../utils/errorHandler');


exports.getAllPassword = catchAsyncError(
    async (req, res, next) => {

        const allPasswords = await passwordModel.find({ user: req.params.id }).sort({ createdAt: -1 });

        if (!allPasswords) {
            return next(new ErrorHandler("No Lists Found", 404));
        }

        return res.status(200).json(allPasswords);

    }
)

exports.createPassword = catchAsyncError(
    async (req, res, next) => {
        req.body.user = req.params.id;

        // console.log(req.body.user);
        const Passwordd = await passwordModel.create(req.body);

        if (Passwordd) {
            res.status(201).json({ success: true, Passwordd });
        }

        else {
            res.status(400).json({ success: false });
        }
    }
)


exports.updatePassword = catchAsyncError(
    async (req, res, next) => {

        const id = req.params.id;
        const Passwordd = await passwordModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (Passwordd) {
            res.status(200).json({ success: true, Passwordd });
        }

        else {
            res.status(400).json({ success: false });
        }

    }
)

exports.deletePassword = catchAsyncError(
    async (req, res, next) => {

        const { id } = req.params;

        const Passwordd = await passwordModel.findOneAndDelete({ _id: id });

        if (Passwordd) {
            res.status(200).json({ success: true, Passwordd });
        }

        else {
            res.status(400).json({ success: false });
        }
    }
)

exports.deleteAllPasswords = catchAsyncError(
    async (req, res, next) => {

        const { id } = req.params;

        const Passwordd = await passwordModel.delete({ user: id });

        if (Passwordd) {
            res.status(200).json({ success: true, Passwordd });
        }
        else {
            res.status(400).json({ success: false });
        }

    }
)