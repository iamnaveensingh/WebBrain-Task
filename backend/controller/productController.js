import productModel from "../model/productModel.js";
import cartModel from "../model/cartModel.js";


export const createProduct = async (req, res) => {
    try {
        const { title, disc, price, status, image } = req.body
        if (!title || !disc || !price || !status || !image || (typeof (image) == "object")) {
            res.status(400).json({
                message: "Somthing Went Wrong",
                success: false,
                product
            })
        }
        req.body.createdBy = req.body.user.userId
        const product = await productModel.create({ title, disc, price, status, image })
        res.status(201).json({
            message: "Added Successfully ",
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
    }
}

export const addToCart = async (req, res) => {
    try {
        const { title, disc, price, status, image } = req.body
        if (!title || !disc || !price || !status || !image || (typeof (image) == "object")) {
            res.status(400).json({
                message: "Somthing Went Wrong",
                success: false,
                product
            })
        }
        req.body.createdBy = req.body.user.userId
        const product = await cartModel.create({ title, disc, price, status, image })
        res.status(201).json({
            message: "Added Successfully ",
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
    }
}

export const readProduct = async (req, res) => {
    try {

        const products = await productModel.find()
        res.status(201).send({ products })

    } catch (error) {
        console.log(error)
    }
}
export const readInStock = async (req, res) => {
    try {
        const products = await productModel.find({ status: "inStock" })
        res.status(201).send({ products })

    } catch (error) {
        console.log(error)
    }
}
export const readSold = async (req, res) => {
    try {
        const products = await productModel.find({ status: "sold" })
        res.status(201).send({ products })
    } catch (error) {
        console.log(error)
    }
}

export const getCart = async (req, res) => {
    try {

        const products = await cartModel.find()
        res.status(201).send({ products })

    } catch (error) {
        console.log(error)
    }
}
export const findProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = await productModel.findOne({ _id: id })
        if (!data) {
            res.status(400).send({
                message: 'Not found',
                success: false
            })
        }

        res.status(201).send({ data })

    } catch (error) {
        console.log(error)
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, disc, price, status, image } = req.body

        const data = await productModel.findByIdAndUpdate(id, { title, disc, price, status, image })
        if (!data) {
            res.status(400).send({
                Meaasge: "Something Went Wrong",
                success: false
            })
        }

        res.status(201).send({
            Meaasge: "Update Successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const data = await productModel.findOneAndDelete({ _id: id })
    if (!data) {
        res.status(400).json({
            Meaasge: "Something Went Wrong",
            success: false
        })
    }

    res.status(200).json({
        Meaasge: "Product is Successfully deleted",
        success: true
    })
}
export const deleteCart = async (req, res) => {
    const { id } = req.params
    const data = await cartModel.findOneAndDelete({ _id: id })
    if (!data) {
        res.status(400).json({
            Meaasge: "Something Went Wrong",
            success: false
        })
    }

    res.status(200).json({
        Meaasge: "Product is Successfully deleted",
        success: true
    })
}


