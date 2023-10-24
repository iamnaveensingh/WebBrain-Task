import adminModel from "../model/adminModel.js";

export const adminRegister = async (req, res) => {
    try {
        const { name, email, password, adminKey } = req.body;

        if (!adminKey) {
            return res.status(400).send({
                message: "Please enter adminKey",
                success: false,
            })
        }

        if (!(adminKey === "webBrain")) {

            return res.status(400).send({
                message: "Please enter valid adminKey",
                success: false,
            })
        }
        if (!name) {
            return res.status(400).send({
                message: "Please enter name",
                success: false,
            })
        }
        if (!email) {
            return res.status(400).send({
                message: "Please enter email",
                success: false,
            })

        }
        if (!password) {
            return res.status(400).send({
                message: "Please enter password",
                success: false,
            })
        }

        const existingUser = await adminModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                message: "Email already register Please Login",
                success: false,
            })
        }
        const user = await adminModel.create({ name, email, password, type: "admin" })

        // TOken
        const token = user.createJWT()
        user.password = "****"
        res.status(201).send({
            message: "User created",
            success: true,
            user,
            token
        })

    } catch (error) {
        console.log(error)
    }
}


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                message: "Please enter email and password",
                success: false,
            })
        }
        // find user by email
        const user = await adminModel.findOne({ email })
        if (!user) {
            return res.status(400).send({
                message: "Please register first",
                success: false,
            })

        }
        //compare password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).send({
                message: "Invalid Userid or Password",
                success: false,
            })

        }
        const token = user.createJWT()
        user.password = "****"
        res.status(201).send({
            message: "Login Successfully ",
            success: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
    }
}