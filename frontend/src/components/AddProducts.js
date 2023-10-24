import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Input from './Input';

const AddProducts = () => {
    const [image, setImage] = useState('')
    const [Item, setItem] = useState({
        title: "",
        price: "",
        status: "",
        disc: ""
    })
    const uploadIMG = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "webBrain");
        data.append("cloud_name", "dlfspcces");
        fetch("https://api.cloudinary.com/v1_1/dlfspcces/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => setImage(data.url))
            .catch((err) => console.log(err));
    };

    const addProduct = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('AdminToken')
            const { data } = await axios.post('http://localhost:4000/product/create', { ...Item, image: image },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

            if (data.success) {
                setItem({
                    title: "",
                    price: "",
                    status: "",
                    disc: ""
                })
                toast.success('Added Successfully !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error('Something Went Wrong !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error)
        }

    }
    const onChange = (e) => {
        setItem({ ...Item, [e.target.name]: e.target.value })
    }

console.log(Item)
    return (
        <>
            {
                (localStorage.getItem('AdminToken')) ? (
                    <div className="bg-gray-50 dark:bg-gray-900">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Add Product details
                                    </h1>
                                    <form className="space-y-4 md:space-y-4" onSubmit={addProduct}>

                                        <Input required={"required"} value={Item.title} onChange={onChange} type={"text"} name={"title"} label={"Title"} placeholder={"Product Title"} />
                                        <Input required={"required"} onChange={(e) => setImage(e.target.files[0])} type={"file"} name={"image"} label={"Image"} placeholder={"Product Image"} />
                                        <div onClick={uploadIMG} className='bg-green-300 cursor-pointer w-32 text-center rounded-lg p-2'>Upload Image</div>
                                        <Input required={"required"} value={Item.price} onChange={onChange} type={"number"} name={"price"} label={"Price"} placeholder={"Product Price"} />
                                        <select name="status" onChange={onChange} value={Item.status}>
                                            <option value="inStock">In Stock</option>
                                            <option value="Sold">Sold</option>
                                        </select>
                                        <Input required={"required"} value={Item.disc} onChange={onChange} type={"text"} name={"disc"} label={"Discreption"} placeholder={"Product Discreption"} />
                                        {
                                            ((image === '') || (image === undefined) || (typeof (image) === 'object')) ? (
                                                <div className="w-full dark:bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Wait for Image Upload</div>
                                            ) : (
                                                <button type='submit' className="w-full dark:bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                                            )
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : ("You are not authorize to see this page")
            }

        </>
    )
}

export default AddProducts
