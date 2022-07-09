
const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    const options = {
        expire: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
    }

    res.status(statusCode).cookie('token', token, options).json(
        {
            success: true,
            token,
            user
        }
    )

}
module.exports = sendToken;