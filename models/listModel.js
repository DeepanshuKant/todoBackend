const mongoose = require('mongoose')

const listSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "Please Enter Title"] },
        description: { type: String, required: [true, "Please Enter Description"] },
        priority: { type: String, default: "low" },
        user: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
        createdAt: { type: Date, default: Date.now },
    }
)


const listModel = mongoose.model('lists', listSchema);


module.exports = listModel;