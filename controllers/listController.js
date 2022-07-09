const listModel = require('../models/listModel');
const catchAsyncError = require('../middleware/catctAsyncError');
const ErrorHandler = require('../utils/errorHandler');


exports.getAllList = catchAsyncError(
    async (req, res, next) => {

        const allLists = await listModel.find({ user: req.params.id }).sort({ createdAt: -1 });

        if (!allLists) {
            return next(new ErrorHandler("No Lists Found", 404));
        }

        return res.status(200).json(allLists);

    }
)

exports.createList = catchAsyncError(
    async (req, res, next) => {
        req.body.user = req.params.id;

        // console.log(req.body.user);
        const List = await listModel.create(req.body);

        if (List) {
            res.status(201).json({ success: true, List });
        }

        else {
            res.status(400).json({ success: false });
        }
    }
)


exports.updateList = catchAsyncError(
    async (req, res, next) => {

        const id = req.params.id;
        const List = await listModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (List) {
            res.status(200).json({ success: true, List });
        }

        else {
            res.status(400).json({ success: false });
        }

    }
)

exports.deleteList = catchAsyncError(
    async (req, res, next) => {

        const { id } = req.params;

        const List = await listModel.findOneAndDelete({ _id: id });

        if (List) {
            res.status(200).json({ success: true, List });
        }

        else {
            res.status(400).json({ success: false });
        }
    }
)