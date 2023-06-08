const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');



const passwordSchema = new mongoose.Schema(
    {
        id: { type: String, required: [true, "Please Enter ID"] },
        password: { type: String, required: [true, "Please Enter Password"] },
        category: { type: String, default: "Google" },
        user: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
        createdAt: { type: Date, default: Date.now },
    }
)

passwordSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await btoa(this.password);
})



const passwordModel = mongoose.model('passwords', passwordSchema);


module.exports = passwordModel;