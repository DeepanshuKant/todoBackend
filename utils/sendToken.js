
const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    return res.cookie('token', token, {
        expires: new Date(Date.now() + 1000),
        httpOnly: true,
    }).status(statusCode).json(
        {
            success: true,
            user,
            token
        }
    )

}
module.exports = sendToken;