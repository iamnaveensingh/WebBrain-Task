import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        next('Auth Fald')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.body.user = { userId: payload.userId }
        next()
    } catch (error) {
        next('Auth faild')
    }
}
export default userAuth;